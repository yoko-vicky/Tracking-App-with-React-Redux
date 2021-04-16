import axios from 'axios';
import baseUrl from './baseUrl';

export const signedUp = async (username, password) => {
  const response = await axios.post(`${baseUrl}signup`, { user: { username, password } }, { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const loggedIn = async (username, password) => {
  const response = await axios.post(`${baseUrl}login`, { user: { username, password } }, { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};
