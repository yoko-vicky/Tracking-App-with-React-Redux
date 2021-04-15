import axios from 'axios';

export const signedUp = async (username, password) => {
  const submitData = {
    user: {
      username,
      password,
    },
  };
  const response = await axios.post('http://localhost:3001/signup', { submitData }, { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const loggedIn = async (username, password) => {
  const submitData = {
    user: {
      username,
      password,
    },
  };
  const response = await axios.post('http://localhost:3001/login', { submitData }, { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const loggedOut = async () => {
  const response = await axios.delete('http://localhost:3001/logout', { withCredentials: true })
    .then((response) => response).catch((error) => error);
  return response;
};
