import axios from 'axios';
import { BACKEND } from '../APP-CONFIG';
import { getAuth } from './localStorage';

const formatResponse = ({ data }) => {
  return data;
};

const formatCatch = error => {
  return error;
};

const mountHeader = ({ token, params, method = 'GET', data }) => {
  return {
    method,
    headers: { 'x-auth': token },
    params,
    data
  };
};

const mountHeaderGet = ({ token, args = {}, method = 'GET' }) => {
  return {
    method,
    headers: { 'x-auth': token },
    params: args
  };
};

export const promiseFactory = async (endpoint, args = {}, method = 'get') => {
  const { token } = await getAuth();
  const params = mountHeaderGet({
    token,
    args,
    method: method.toUpperCase()
  });
  return axios[method](`${BACKEND}/${endpoint}`, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

export const promiseFactoryPost = async (
  endpoint,
  data = {},
  method = 'post'
) => {
  const { token } = await getAuth();
  const params = mountHeader({ token, data, method: method.toUpperCase() });
  return axios[method](`${BACKEND}/${endpoint}`, data, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};
