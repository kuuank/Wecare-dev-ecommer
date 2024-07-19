import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAccessToken } from "./getAccessToken";

const getDistinctProductGroups = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const table = "crdfd_productgroups";
  const columns =
    "crdfd_nhomsanphamcap1text,_crdfd_cap1_value, crdfd_productname";
  let filter = "_crdfd_nhomsanphamcap1_value ne null";
  const query = `$select=${columns}&$filter=${filter}`;
  const initialEndpoint = `https://wecare-ii.crm5.dynamics.com/api/data/v9.2/${table}?${query}`;

  let apiEndpoint = initialEndpoint;
  let distinctGroups = new Map<string, { name: string; products: string[] }>();

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
        response.data.value.forEach((item: any) => {
          if (item._crdfd_cap1_value) {
            if (!distinctGroups.has(item._crdfd_cap1_value)) {
              distinctGroups.set(item._crdfd_cap1_value, {
                name: item.crdfd_nhomsanphamcap1text,
                products: [],
              });
            }
            if (item.crdfd_productname) {
              distinctGroups
                .get(item._crdfd_cap1_value)
                ?.products.push(item.crdfd_productname);
            }
          }
        });
        apiEndpoint = response.data["@odata.nextLink"];
      } else {
        break;
      }
    }

    const allResults = Array.from(distinctGroups.entries()).map(
      ([id, data]) => ({
        id,
        name: data.name,
        products: data.products,
      })
    );
    res.status(200).json(allResults);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default getDistinctProductGroups;
