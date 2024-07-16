import axios from "axios";

const DATAVERSE_API_URL =
  "https://wecare-ii.api.crm5.dynamics.com/api/data/v9.2";
// page serc
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL3dlY2FyZS1paS5jcm01LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzA4ZGQ3MGFiLWFjM2ItNGEzMy1hY2QxLWVmM2ZlMTcyOWU2MS8iLCJpYXQiOjE3MjEwMDc3MzgsIm5iZiI6MTcyMTAwNzczOCwiZXhwIjoxNzIxMDEyMTA5LCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVRRQXkvOFhBQUFBYkNDQVpydnBXejFjRzdaNzRzajBHc2lSNitjRUZ1RHY3SlJDNnB5WHkyQVVZY0licVA4L0diNVNNT29nemQyRyIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI1MWY4MTQ4OS0xMmVlLTRhOWUtYWFhZS1hMjU5MWY0NTk4N2QiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkzDqiBIdeG7s25oIiwiZ2l2ZW5fbmFtZSI6Ik3huqFuaCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjQyLjExNy4xMDAuNDIiLCJsb2dpbl9oaW50IjoiTy5DaVEzWkRVeVlURTNaUzAwT1dVd0xUUmxObUl0T1RNNVl5MDJOV1UzWlRVNE1EYzNPRFFTSkRBNFpHUTNNR0ZpTFdGak0ySXROR0V6TXkxaFkyUXhMV1ZtTTJabE1UY3lPV1UyTVJvVWJXRnVhQzVzWlVCM1pXTmhjbVV0YVM1amIyMGdlQT09IiwibmFtZSI6IkzDqiBIdeG7s25oIE3huqFuaCIsIm9pZCI6IjdkNTJhMTdlLTQ5ZTAtNGU2Yi05MzljLTY1ZTdlNTgwNzc4NCIsInB1aWQiOiIxMDAzMjAwMzE1MTQ5QjhBIiwicmgiOiIwLkFYRUFxM0RkQ0R1c00wcXMwZThfNFhLZVlRY0FBQUFBQUFBQXdBQUFBQUFBQUFEQUFBSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJpd3RESVgtdTIzeWd2OFZvckxXMk1UN2Y5c0RBWnBhcVEyQ0VLNTVEelJrIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiMDhkZDcwYWItYWMzYi00YTMzLWFjZDEtZWYzZmUxNzI5ZTYxIiwidW5pcXVlX25hbWUiOiJtYW5oLmxlQHdlY2FyZS1pLmNvbSIsInVwbiI6Im1hbmgubGVAd2VjYXJlLWkuY29tIiwidXRpIjoieVh4ZHRJVGRta0cyX255c09hZzBBQSIsInZlciI6IjEuMCIsInhtc19pZHJlbCI6IjEgMTAifQ.fjar5sFqJBOnx6Ih4yXDeZaNETix3JEN-pRKqEhfRaxwmlpueDeJEYzqg0DPRjh_DSBrajcYUnAhDa_D4apiIlpFcMfQRbk7qxed1ZQ3gPRqyZvnU4TOB4mAn-i3pei5FlWOsbRS7RGrjQ238GW2xKjUQMxAPJ9OpHa4gAyVbKMwb5KjcHxPNsYvb4xquy7UCxBytIDJkC5g_hZDMoYMRKMzNOyghxBhQp6hgNOr9ii3jG2rdAs6brXjE39fd0T-FRjSYwEaWZKPB8t5PZhlHLgZWJca4fREH9yq8FY-fPr8KHF1wsw5NmFGiTgtHTuAC2J8JCrRfFxJXXfBjMm4mw";
export interface SOD {
  crdfd_name: string;
  crdfd_productname: string;
  crdfd_soonhangchitiet2: string;
  crdfd_tongtienkhongvatnew: string;
  crdfd_giatrivat: string;
  crdfd_khachhangtext: string;
  crdfd_localtext: string;
  crdfd_nhanviensalestext: string;
}
interface DataverseResponse {
  value: SOD[];
}

export const getDataSO = async (): Promise<SOD[]> => {
  try {
    const response = await axios.get(
      `${DATAVERSE_API_URL}/crdfd_sale_orders?$top=5&$filter=statecode eq 0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.value as SOD[];
  } catch (error) {
    console.error("Error fetching Dataverse data:", error);
    throw error;
  }
};

interface DataverseResponse {
  value: SOD[];
  "@odata.nextLink"?: string;
  [key: string]: any;
}

export async function getSaleOrder_paging(
  pageNumber: number,
  pageSize: number
): Promise<{ saleOrders: SOD[]; hasNextPage: boolean }> {
  try {
    let url = `${DATAVERSE_API_URL}/crdfd_sale_orders?$top=${pageSize}&$orderby=createdon desc&$filter=statecode eq 0`;
    let saleOrders: SOD[] = [];
    let currentPage = 1;

    while (currentPage <= pageNumber) {
      const response = await axios.get<DataverseResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (currentPage === pageNumber) {
        saleOrders = response.data.value;
      }

      if (response.data["@odata.nextLink"]) {
        url = response.data["@odata.nextLink"];
        currentPage++;
      } else {
        break;
      }
    }

    console.log(
      "Response - page " + pageNumber + "_" + pageSize + ":",
      saleOrders
    );

    const hasNextPage = !!url;

    return { saleOrders, hasNextPage };
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    return { saleOrders: [], hasNextPage: false };
  }
}
