import axios from 'axios';

const getItems = async () => {
  const response = axios.get('http://localhost:3001/items',
    { withCredentials: true })
    .then((response) => response.data).catch((error) => error);
  return response;
};

export default getItems;
