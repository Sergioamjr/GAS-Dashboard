//@flow

import axios from "axios";
import _get from "lodash/get";
import RequestWithParams from "./utils";
import { BACKEND } from "../APP-CONFIG";
import { getAuth } from "./localStorage";

export const getPesageList = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${BACKEND}/list-pesagens`);
      const data = _get(response, "data", false);
      return resolve(data || response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getConsumeList = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${BACKEND}/list-consumo`);
      const data = _get(response, "data", false);
      return resolve(data || response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getList = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${BACKEND}/listreq`);
      const data = _get(response, "data", false);
      return resolve(data || response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getListById = (id: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${BACKEND}/listreq/${id}`);
      const data = _get(response, "data", false);
      return resolve(data || response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const createRequest = (params: any = {}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/createnewreq`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

export interface updateRequestType {
  origem: string;
  destino: string;
  pickup_date: any;
  pickup_time: string;
  material: string;
  quantidade: string;
  ordem_vendas: string;
  comentario: string;
  usuario: string;
  rowid: string;
  refuse_reason?: any;
  status?: any;
}

export const updateRequest = (params: updateRequestType): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();

      const { data } = await RequestWithParams(`${BACKEND}/updatereq`, "post", {
        ...params,
        username,
        password
      });
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface confirmRequest_ {
  rowid: string;
  transportadora: string;
  tipo_veiculo: string;
}

export const confirmRequest = (params: confirmRequest_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();

      const { data } = await RequestWithParams(
        `${BACKEND}/confirmarreq`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface refuseRequest_ {
  rowid: string;
  motivo_recusa: string;
  usuario: string;
}

export const recusarRequisicao = (params: refuseRequest_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();

      const { data } = await RequestWithParams(
        `${BACKEND}/rejeitarreq`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface insertTicketBalance_ {
  rowid: string;
  ticket_balanca: string;
  motorista: string;
  peso_liquido: string;
  remessa: string;
}

export const insertTicket = (params: insertTicketBalance_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();

      const { data } = await RequestWithParams(
        `${BACKEND}/inserirticketbalanca`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface inserirNfe_ {
  chave_de_acesso: string;
  data_emissao: any;
  valor: string;
  peso: string;
  rowid: string;
}

export const inserirNfe = (params: inserirNfe_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();

      const { data } = await RequestWithParams(
        `${BACKEND}/inserirnfe`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface inserirCte_ {
  chave_de_acesso: string;
  rowid: string;
}

export const inserirCte = (params: inserirCte_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/inserircte`,
        "post",

        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface registrarChegada_ {
  rowid: string;
  ticket_balanca_destino: number;
  peso_liquido_destino: number;
  desvio_peso: number;
  usuario: string;
}

export const registrarChegada = (params: registrarChegada_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/registrarchegada`,
        "post",
        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface registrarConsumo_ {
  id: number;
  peso_liquido: number;
  consumo: number;
  saldo: number;
  usuario: string;
  id_consumo: number;
}

export const registrarConsumo = (params: registrarConsumo_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/registrarconsumo`,
        "post",

        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

export const requestFormHistory = (id: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${BACKEND}/viewreq/${id}`);
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface inserirPlacas_ {
  id: string;
  placa_cavalo: string;
  placa_carreta: string;
  username: string;
}

export const inserirPlacas = (params: inserirPlacas_): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/inserirplacas`,
        "post",

        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

interface informarDestinacao_ {
  id: string;
  id_consumo: number;
  alcool: number;
  vinhaca: number;
  destino: string;
}

export const informarDestinacao = (
  params: informarDestinacao_
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = await getAuth();
      const { data } = await RequestWithParams(
        `${BACKEND}/informardestinacao`,
        "post",

        {
          ...params,
          username,
          password
        }
      );
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};
