import axios from 'axios';

export const shortenGuest = async (mainUrl) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/shorten-guest`, mainUrl);

export const shortenUser = async (mainUrl, userId) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API}/shorten-user`,
    mainUrl,
    userId
  );

// export const getUsers = async (users) =>
//   await axios.get(`${process.env.NEXT_PUBLIC_API}/users`, users);

// export const getUrls = async (urls) =>
//   await axios.get(`${process.env.NEXT_PUBLIC_API}/users`, urls);

export const getStats = async () =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/stats`);
