import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export default customAxios;