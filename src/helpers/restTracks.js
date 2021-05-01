import { sendRequestWithData, sendRequestWithoutData } from './api';

export const getTracks = async () => {
  const response = await sendRequestWithoutData('get', 'records')
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const addNewTrack = async (result, itemId, date) => {
  const response = await sendRequestWithData('post', 'records', { record: { result, itemId, date } })
    .then((response) => response).catch((error) => error);
  return response;
};

export const updateTrack = async (id, result, itemId, date) => {
  const response = await sendRequestWithData('put', `records/${id}`, { record: { result, itemId, date } })
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeTrackFromDB = async (id) => {
  const response = await sendRequestWithoutData('delete', `records/${id}`)
    .then((response) => response).catch((error) => error);
  return response;
};
