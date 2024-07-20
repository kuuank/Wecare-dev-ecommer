import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAccessToken } from "./getAccessToken";
import Products from "../../model/data_model";

const getProductData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchTerm, searchKey } = req.query;

  // Đảm bảo searchTerm và searchKey là string.
  const searchTermString = Array.isArray(searchTerm) ? searchTerm[0] : searchTerm || "";
  const searchKeyString = Array.isArray(searchKey) ? searchKey[0] : searchKey || "";

  const table = "crdfd_productses";
  const columns =
    "_crdfd_productgroup_value,cr1bb_nhomsanphamcha,crdfd_manhomsp,crdfd_thuonghieu,crdfd_quycach,crdfd_chatlieu,crdfd_hoanthienbemat,crdfd_nhomsanphamtext,cr1bb_giaban"; //,crdfd_hinhanh

  const filter = searchTermString
    ? `&$filter=contains(${encodeURIComponent(searchKeyString)}, '${encodeURIComponent(
        searchTermString
      )}')`
    : "";
  const query = `$select=${columns}${filter}`;
  const initialEndpoint = `https://wecare-ii.crm5.dynamics.com/api/data/v9.2/${table}?${query}`;

  let apiEndpoint = initialEndpoint;
  let allResults: Products[] = [];

  try {
    const token = await getAccessToken();

    while (apiEndpoint) {
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
      } else {
        break;
      }
    }

    res.status(200).json(allResults);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default getProductData;