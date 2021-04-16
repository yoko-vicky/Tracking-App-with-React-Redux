import axios from 'axios';
import baseUrl from './baseUrl';

export const getItems = async () => {
  const response = await axios.get(`${baseUrl}items`,
    { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateItem = async (id, title, unit, icon) => {
  const response = await axios.put(`${baseUrl}items/${id}`, { item: { title, unit, icon } })
    .then((response) => response).catch((error) => error);
  return response;
};

export const addNewItem = async (title, unit, icon) => {
  const response = await axios.post(`${baseUrl}items`, { item: { title, unit, icon } })
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeItemFromDB = async (id) => {
  const response = await axios.delete(`${baseUrl}items/${id}`, { id })
    .then((response) => response).catch((error) => error);
  return response;
};
