import axios from 'axios';

export const shortenGuest = async (mainUrl) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/shorten-guest`, mainUrl);

export const shortenUser = async ({ mainUrl, userId }, token) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API}/shorten-user`,
    { mainUrl, userId },
    {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    }
  );

export const redirect = async (urlId) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/${urlId}`);
