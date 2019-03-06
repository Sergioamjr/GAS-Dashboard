import { promiseFactory, promiseFactoryPost } from './config';

export const registerVoluntary = async params => {
  return await promiseFactoryPost('register-voluntary', params);
};

export const updateVoluntary = async params => {
  return await promiseFactoryPost('update-voluntary', params, 'patch');
};

export const getVoluntary = async () => {
  return await promiseFactory('data-de-entrega');
};

export const isRegistered = async ({ user_id, action_id }) => {
  return await promiseFactory(
    `is-registered?user_id=${user_id}&action_id=${action_id}`
  );
};

export const deleteVoluntary = async params => {
  return await promiseFactory('delete-voluntary', params, 'delete');
};

export const voluntaryHistory = async params => {
  return await promiseFactory('has-history', params);
};
