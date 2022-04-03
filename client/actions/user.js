import axios from 'axios';

export const getUser = async (userId, token) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });

export const getUserUrls = async (userId, token) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}/urls/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });

export const editUrl = async ({ userId, urlId, newUrlId }, token) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API}/edit-url`,
    { userId, urlId, newUrlId },
    {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    }
  );
