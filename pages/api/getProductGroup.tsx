import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAccessToken } from "./getAccessToken";
import Products from "../../model/data_model";

const getProductGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { crdfd_productname } = req.query;
  const columnSearch = "crdfd_productname";
  const table = "crdfd_productgroups";
  const columns =
    "_crdfd_nhomsanphamcap1_value, crdfd_productname,crdfd_nhomsanphamchafull,crdfd_nhomsanphamcap1text,crdfd_hinhanh_url,crdfd_nhomsanphamfull,crdfd_nhomsanphamchatext,crdfd_nhomsptext,crdfd_chatlieu,cr1bb_nganh_nghe,crdfd_capsptext,";

  let filter = "_crdfd_nhomsanphamcap1_value ne null";

  const query = `$select=${columns}&$filter=${filter}`;
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

export default getProductGroup;
