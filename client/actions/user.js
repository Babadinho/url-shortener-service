import axios from 'axios';

export const getUser = async (userId, token) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });

export const getUserUrls = async (userId) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}/urls/${userId}`);

export const editUrl = async (userId, urlId) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/edit-url`, userId, urlId);
