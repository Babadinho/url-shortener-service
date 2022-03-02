import axios from 'axios';

export const shortenGuest = async (mainUrl) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/shorten-guest`, mainUrl);

export const shortenUser = async (mainUrl, userId) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API}/shorten-user`,
    mainUrl,
    userId
  );
