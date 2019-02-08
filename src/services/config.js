import axios from 'axios';
import { BACKEND } from '../APP-CONFIG';
import { getAuth } from './localStorage';

const formatResponse = ({ data }) => {
  return data;
};

const formatCatch = error => {
  return error;
};

const mountHeader = (token, params, method = 'GET') => {
  return {
    method,
    headers: { 'x-auth': token },
    params
  };
};

export const promiseFactory = async (endpoint, args = {}, method = 'get') => {
  const { token } = await getAuth();
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

export const promiseFactoryPost = async (
  endpoint,
  args = {},
  method = 'post'
) => {
  const { token } = await getAuth();
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, args, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};
