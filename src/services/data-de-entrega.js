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

export const deleteRota = async params => {
  return await promiseFactory('delete-rota', params, 'delete');
};

export const getRotas = async () => {
  return await promiseFactory('get-rotas');
};

export const createRota = async params => {
  return await promiseFactoryPost('create-rota', params);
};

export const updateEntrega = async params => {
  return await promiseFactoryPost('atualizar-entrega', params, 'put');
};

export const getUsers = async () => {
  return await promiseFactory('get-users');
};

export const deleteUser = async params => {
  return await promiseFactory('deletar-usuario', params, 'delete');
};

// server.post('/create-rota', createRota);
// server.patch('/update-rota', updateRotas);
// server.delete('/delete-rota', deleteRotas);
