import axios from 'axios';
import baseUrl from './baseUrl';
import authHeaders from './authHeaders';

export const getItems = async () => {
  const response = await axios.get(`${baseUrl}items`, { data: {} }, authHeaders())
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateItem = async (id, title, unit, icon, target) => {
  const response = await axios.put(`${baseUrl}items/${id}`, {
    item: {
      title, unit, icon, target,
    },
    data: {},
  }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const addNewItem = async (title, unit, icon, target) => {
  const response = await axios.post(`${baseUrl}items`, {
    item: {
      title, unit, icon, target,
    },
    data: {},
  }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeItemFromDB = async (id) => {
  const response = await axios.delete(`${baseUrl}items/${id}`, { data: {} }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};
