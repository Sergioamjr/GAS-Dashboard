import { promiseFactory, promiseFactoryPost } from './config';

export const addNewDate = async params => {
  return await promiseFactoryPost('data-de-entrega', params);
};

export const getDates = async () => {
  return await promiseFactory('data-de-entrega');
};

export const getNextActionDate = async () => {
  return await promiseFactory('proxima-data-de-entrega');
};

export const deleteDate = async params => {
  return await promiseFactory('delete-data-de-entrega', params, 'delete');
};
