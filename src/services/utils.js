// @flow

import * as axios from "axios";

const RequestWithParams = (
  baseURL: string,
  method: string = "post",
  params: any
) => {
  return axios.create({
    baseURL,
    method,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })();
};

export default RequestWithParams;
