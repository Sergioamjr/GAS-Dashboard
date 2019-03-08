import axios from 'axios';
import { BACKEND } from '../APP-CONFIG';
import { getAuth } from './localStorage';

export const Login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject('Digite seu e-mail e senha.');
    }

    return axios
      .post(`${BACKEND}/login`, { email, password })
      .then(({ data }) => {
        return resolve(data);
      })
      .catch(({ response }) => {
        const { data } = response;
        return reject(data || response);
      });
  });
};

export const CreateLoginWithFacebook = params => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await CreateUser(params);
      return resolve(user);
    } catch (error) {
      const { errorMessage } = error;
      if (errorMessage && errorMessage.includes('Já existe')) {
        try {
          const loginResponse = await Login(params);
          return resolve(loginResponse);
        } catch (loginError) {
          return reject({
            errorMessage:
              'Erro ao logar com o Facebook. Tente depois ou recupere sua senha.'
          });
        }
      }
      return reject({
        errorMessage:
          'Erro ao criar sua conta com o Facebook. Tente depois ou use um e-mail.'
      });
    }
  });
};

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

const promiseFactory = async (endpoint, args = {}, method = 'get') => {
  const { token } = await getAuth();
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

const promiseFactoryPost = async (endpoint, args = {}, method = 'post') => {
  const { token } = await getAuth();
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, args, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

export const searchUser = async search => {
  return await promiseFactory('search-user', { search });
};

export const getPartners = async _id => {
  return await promiseFactory('get-user-partners', { _id });
};

export const getUserInfo = async _id => {
  return await promiseFactory('get-by-id', { _id });
};

// profile-image-by-id

export const addUserAsPartner = async params => {
  return await promiseFactoryPost('add-partner', params);
};

export const removeUserAsPartner = async params => {
  return await promiseFactoryPost('remove-partner', params);
};

export const hasValidToken = async params => {
  return await promiseFactoryPost('token', params);
};

export const updateUser = async params => {
  return await promiseFactoryPost('atualizar-usuario', params, 'put');
};

export const CreateUser = ({
  nome,
  email,
  password,
  repassword,
  sobrenome
}) => {
  return new Promise((resolve, reject) => {
    if (!nome || !email || !password || !repassword || !sobrenome) {
      return reject('Preencha todos os campos.');
    }

    if (password !== repassword) {
      return reject('Senhas não conferem.');
    }

    return axios
      .post(`${BACKEND}/create-user`, { nome, email, password, sobrenome })
      .then(({ data }) => {
        return resolve(data);
      })
      .catch(({ response }) => {
        const { data } = response;
        return reject(data || response);
      });
  });
};

export const RequestResetPassword = ({ email }) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      return reject('Preencha seu e-email.');
    }

    return axios
      .post(`${BACKEND}/send-email-to-reset-password`, { email })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { data } = response;
        return reject(data || response);
      });
  });
};

export const ResetPassword = ({ password, repassword, token }) => {
  return new Promise((resolve, reject) => {
    if (!password || !repassword) {
      return reject('Digite e confirme sua nova senha.');
    } else if (password !== repassword) {
      return reject('Senhas não conferem.');
    }

    return axios
      .post(`${BACKEND}/reset-password`, { password, repassword, token })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { data } = response;
        return reject(data || response);
      });
  });
};

export const ValidateToken = ({ token }) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject('Token não fornecido.');
    }

    return axios
      .post(`${BACKEND}/token`, { token })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { data } = response;
        return reject(data || response);
      });
  });
};

export const uploadProfileImage = (image, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('image', image, user_id);

      const response = await fetch(`${BACKEND}/upload-profile-image`, {
        method: 'POST',
        body: formData
      });
      const toJson = await response.json();
      return resolve(toJson);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getProfileImage = async user_id => {
  return await promiseFactory('profile-image-by-id', { user_id });
};
