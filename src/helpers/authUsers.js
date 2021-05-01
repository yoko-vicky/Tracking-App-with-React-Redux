import { sendRequestWithData } from './api';

export const signedUp = async (username, password) => {
  const response = await sendRequestWithData('post', 'signup', { user: { username, password } })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const loggedIn = async (username, password) => {
  const response = await sendRequestWithData('post', 'login', { user: { username, password } })
    .then((response) => response.data).catch((error) => error);
  return response;
};
