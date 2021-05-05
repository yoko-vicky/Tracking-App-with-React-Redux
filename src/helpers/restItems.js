import { sendRequestWithData, sendRequestWithoutData } from './api';

export const getItems = async () => {
  const response = await sendRequestWithoutData('get', 'items')
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateItem = async (id, title, unit, icon, target) => {
  const response = await sendRequestWithData('put', `items/${id}`, {
    item: {
      title, unit, icon, target,
    },
  })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const addNewItem = async (title, unit, icon, target) => {
  const response = await sendRequestWithData('post', 'items', {
    item: {
      title, unit, icon, target,
    },
  })
    .then((response) => response).catch((error) => error);
  return response;
};

export const removeItemFromDB = async (id) => {
  const response = await sendRequestWithoutData('delete', `items/${id}`)
    .then((response) => response).catch((error) => error);
  return response;
};
