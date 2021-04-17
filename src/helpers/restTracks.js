import axios from 'axios';
import baseUrl from './baseUrl';
import authHeaders from './authHeaders';

export const getTracks = async () => {
  const response = await axios.get(`${baseUrl}records`, authHeaders())
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateTrack = async (id, result, itemId, date) => {
  const response = await axios.put(`${baseUrl}records/${id}`, { record: { result, itemId, date } }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const addNewTrack = async (result, itemId, date) => {
  const response = await axios.post(`${baseUrl}records`, { record: { result, itemId, date } }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeItemFromDB = async (id) => {
  const response = await axios.delete(`${baseUrl}records/${id}`, { id }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};
