import { sendRequestWithData } from './api';

export const signedUp = async (username, password) => {
  const response = await sendRequestWithData('post', 'users', { user: { username, password } })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const loggedIn = async (username, password) => {
  const response = await sendRequestWithData('post', 'login', { user: { username, password } })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const autoLogin = async (userId) => {
  const response = await sendRequestWithData('post', 'auto_login', { user: { user_id: userId } })
    .then((response) => response.data).catch((error) => error);
  return response;
};
