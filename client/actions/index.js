import axios from 'axios';

export const index = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}`);

export const shorten = async (mainUrl) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/shorten`, mainUrl);
