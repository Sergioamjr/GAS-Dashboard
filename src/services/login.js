// @flow
import RequestWithParams from "./utils";
import { BACKEND } from "../APP-CONFIG";

interface Params {
  username: string;
  password: string;
}

export const Login = (params: Params): Promise<{}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await RequestWithParams(
        `${BACKEND}/login`,
        "post",
        params
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};
