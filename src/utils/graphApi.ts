// CREATE POST REQUEST TO AZURE AD USING GRAPH API
import axios from 'axios';

/*
1) Get an access token
2) Use the access token to make requests to the Microsoft Graph API
  - authorization: `Bearer ${token}`
*/
export const sendToAzure = async (user: any, method: 'POST' | 'PATCH' | 'DELETE') => {
  const url = 'https://graph.microsoft.com/v1.0/users';
  const token = process.env.AZURE_BEARER_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST') {
    const response = await axios.post(url, user, config);
    console.log(response.data);
    return { user: user, status: "User created successfully", statusCode: 201 };
  }
};
//NEEDADMIN CONSENT FOR APP PERMISSIONS