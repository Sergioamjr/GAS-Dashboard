//@flow
import { getAuth } from "../services/localStorage";

export const paramsWithUser = (params: any): any => {
  return getAuth().then(({ username }) => ({ ...params, username }));
};
