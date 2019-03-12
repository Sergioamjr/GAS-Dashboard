const KEY = 'gas-auth';

export const getAuthDirectly = (item = KEY) => {
  const credentials = localStorage.getItem(item);
  return JSON.parse(credentials);
};

export const getAuth = (item = KEY) => {
  return new Promise((resolve, reject) => {
    try {
      const credentials = localStorage.getItem(item);
      return resolve(JSON.parse(credentials));
    } catch (error) {
      return reject(
        `Não foi possível recuperar informações do usuário: ${error}`
      );
    }
  });
};

export const setAuth = (userInfo, item = KEY) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(item, JSON.stringify(userInfo));
      return resolve();
    } catch (error) {
      return reject(`Não foi possível salvar informações do usuário: ${error}`);
    }
  });
};

export const removeAuth = (item = KEY) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(item);
      return resolve();
    } catch (error) {
      return reject(
        `Não foi possível excluir informações do usuário: ${error}`
      );
    }
  });
};
