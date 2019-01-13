// @flow
const KEY: string = "CST-AUTH";

export const getAuth = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const credentials: ?string = localStorage.getItem(KEY);
      return resolve(JSON.parse(credentials || "{}"));
    } catch (error) {
      return reject(
        `Não foi possível recuperar as informações do usuário ${error}`
      );
    }
  });
};

export const setAuth = (user: {}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(user));
      return resolve();
    } catch (error) {
      return reject(
        `Não foi possível gravar as informações do usuário ${error}`
      );
    }
  });
};

export const removeAuth = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      localStorage.removeItem(KEY);
      return resolve();
    } catch (error) {
      return reject(
        `Não foi possível apagar as informações do usuário ${error}`
      );
    }
  });
};
