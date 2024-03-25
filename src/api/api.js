import axios from 'axios';
import { apiurl } from '../scripts/const';

const client = axios.create({
  baseURL: apiurl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchData = async ({
  url,
  method = 'GET',
  data = null,
  headers = {},
}) => {
  try {
    const response = await client({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default fetchData;
