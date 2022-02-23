import axios from 'axios';

export const shorten = async (mainUrl) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/shorten`, mainUrl);
