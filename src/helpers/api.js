import axios from 'axios';
import originMoment from 'moment';
import baseUrl from './baseUrl';
import authHeaders from './authHeaders';

export const sendRequestWithData = async (method, path, data) => {
  const result = await axios[method](`${baseUrl}/${path}`, data, authHeaders());
  return result;
};

export const sendRequestWithoutData = async (method, path) => {
  const result = await axios[method](`${baseUrl}/${path}`, authHeaders());
  return result;
};

export const moment = (param) => originMoment(param);
