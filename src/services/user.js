import axios from "axios";
import { BACKEND } from "../APP-CONFIG";
import { getAuth } from "./localStorage";

export const Login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject("Digite seu e-mail e senha.");
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
      console.log("user", user);
      return resolve(user);
    } catch (error) {
      const { errorMessage } = error;
      if (errorMessage && errorMessage.includes("Já existe")) {
        try {
          const loginResponse = await Login(params);
          return resolve(loginResponse);
        } catch (loginError) {
          return reject({
            errorMessage:
              "Erro ao logar com o Facebook. Tente depois ou recupere sua senha."
          });
        }
      }
      return reject({
        errorMessage:
          "Erro ao criar sua conta com o Facebook. Tente depois ou use um e-mail."
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

const mountHeader = (token, params, method = "GET") => {
  return {
    method,
    headers: { "x-auth": token },
    params
  };
};

const promiseFactory = async (endpoint, args = {}, method = "get") => {
  // const { token } = await getAuth();
  const token = "das";
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

const promiseFactoryPost = async (endpoint, args = {}, method = "post") => {
  // const { token } = await Storage.getKey();
  const token = "das";
  const params = mountHeader(token, args, method.toUpperCase());
  return axios[method](`${BACKEND}/${endpoint}`, args, { ...params })
    .then(response => formatResponse(response))
    .catch(error => formatCatch(error));
};

export const searchUser = async search => {
  return await promiseFactory("search-user", { search });
};

export const addUserAsPartner = async params => {
  return await promiseFactoryPost("add-partner", params);
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
      return reject("Preencha todos os campos.");
    }

    if (password !== repassword) {
      return reject("Senhas não conferem.");
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
      return reject("Preencha seu e-email.");
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
      return reject("Digite e confirme sua nova senha.");
    } else if (password !== repassword) {
      return reject("Senhas não conferem.");
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
      return reject("Token não fornecido.");
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
