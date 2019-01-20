// @flow

import * as axios from "axios";

const RequestWithParams = (
  baseURL: string,
  method: string = "post",
  data: any
) => {
  return axios.create({
    baseURL,
    method,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })();
};

export default RequestWithParams;
