import * as msal from "@azure/msal-node";
import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.CLIENT_ID || "";
const client_secret = process.env.CLIENT_SECRET || "";
const tenant_id = process.env.TENANT_ID || "";

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

export async function getAccessToken() {
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
