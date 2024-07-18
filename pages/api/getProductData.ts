import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as msal from "@azure/msal-node";
import dotenv from "dotenv";
dotenv.config();

const client_id = process.env.CLIENT_ID || "";
const client_secret = process.env.CLIENT_SECRET || "";
const tenant_id = process.env.TENANT_ID || "";
type Product = {
  crdfd_thuonghieu: string;
  crdfd_quycach: string;
  crdfd_chatlieu: string;
  crdfd_hoanthienbemat: string;
  crdfd_nhomsanphamtext: string;
};
if (!client_id || !client_secret || !tenant_id) {
  throw new Error(
    "Missing environment variables: CLIENT_ID, CLIENT_SECRET, TENANT_ID must be set"
  );
}

const authority = `https://login.microsoftonline.com/${tenant_id}`;
const scope = ["https://wecare-ii.crm5.dynamics.com/.default"];

const app = new msal.ConfidentialClientApplication({
  auth: {
    clientId: client_id,
    authority: authority,
    clientSecret: client_secret,
  },
});

async function getToken() {
  try {
    const tokenResponse = await app.acquireTokenByClientCredential({
      scopes: scope,
    });
    if (tokenResponse && tokenResponse.accessToken) {
      return tokenResponse.accessToken;
    } else {
      throw new Error("No access token found");
    }
  } catch (error) {
    console.error("Error obtaining access token", error);
    throw error;
  }
}

const getProductData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { crdfd_nhomsanphamtext, limit = 30, offset = 1 } = req.query;

  const table = "crdfd_productses";
  const columns =
    "crdfd_thuonghieu,crdfd_quycach,crdfd_chatlieu,crdfd_hoanthienbemat,crdfd_nhomsanphamtext";

  // Modify the query to filter by crdfd_nhomsanphamtext if it's provided
  const filter = crdfd_nhomsanphamtext
    ? `&$filter=crdfd_nhomsanphamtext eq '${crdfd_nhomsanphamtext}'`
    : "";

  const initialQuery = `$top=${limit}&$select=${columns}${filter}`;
  const initialEndpoint = `https://wecare-ii.crm5.dynamics.com/api/data/v9.2/${table}?${initialQuery}`;

  let apiEndpoint = initialEndpoint;
  let allResults: Product[] = [];
  let tokens = 0; // Increment this to attain offset by # of tokens of $top

  try {
    const token = await getToken();

    while (Number(tokens) * Number(limit) < Number(offset) + Number(limit)) {
      console.log(`Fetching data from: ${apiEndpoint}`);
      const response = await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
        },
      });

      if (
        Array.isArray(response.data.value) &&
        response.data.value.length > 0
      ) {
        allResults = allResults.concat(response.data.value);
        apiEndpoint = response.data["@odata.nextLink"];
        tokens++;

        if (!apiEndpoint) break; // Break if there's no next link
      } else {
        break;
      }
    }

    // Get the desired page of results
    const pagedResults = allResults.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );
    res.status(200).json(pagedResults);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default getProductData;
