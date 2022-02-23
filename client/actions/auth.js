import axios from 'axios';

export const register = async (user) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, user);
