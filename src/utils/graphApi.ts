/*
import axios from 'axios';

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
    return await axios.post(url, user, config);
  }
};
