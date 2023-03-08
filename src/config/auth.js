export const msalConfig = {
    auth: {
      clientId: "YOUR_CLIENT_ID",
      authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
      graphContactEndpoint: "https://graph.microsoft.com/v1.0/me/contacts"
  };