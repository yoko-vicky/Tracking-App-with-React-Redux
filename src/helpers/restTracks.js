import axios from 'axios';
import baseUrl from './baseUrl';
import authHeaders from './authHeaders';

export const getTracks = async () => {
  const response = await axios.get(`${baseUrl}records`, { data: {} }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response.data;
};

export const updateTrack = async (id, result, itemId, date) => {
  const response = await axios.put(`${baseUrl}records/${id}`, { record: { result, itemId, date }, data: {} }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const addNewTrack = async (result, itemId, date) => {
  const response = await axios.post(`${baseUrl}records`, { record: { result, itemId, date }, data: {} }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeTrackFromDB = async (id) => {
  const response = await axios.delete(`${baseUrl}records/${id}`, { data: {} }, authHeaders())
    .then((response) => response).catch((error) => error);
  return response;
};
