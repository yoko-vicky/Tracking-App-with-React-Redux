import axios from 'axios';

export const getItems = async () => {
  const response = await axios.get('http://localhost:3001/items',
    { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateItem = async (id, title, unit, icon) => {
  const response = await axios.put(`http://localhost:3001/items/${id}`, { item: { title, unit, icon } })
    .then((response) => response).catch((error) => error);
  return response;
};
