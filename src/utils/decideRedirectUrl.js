//@flow

export const decideStatusRequestFilter = (status: string): string => {
  const statusRequestFilter = {
    pending: "Nova",
    confirmed_shipping: "Confirmado - Transportadora",
    documents: [
      "Confirmado - Remessa",
      "Confirmado - Pesagem",
      "Confirmado - Faturamento"
    ],
    transit: "Em transito",
    received: "Chegada Registrada",
    reject: "Rejeitado",
    processed: "Chegada Validada"
  };

  return statusRequestFilter[status];
};

export const decideRedirectUrl = (status: string): string => {
  const redirectUrlsMap = {
    Nova: "/confirmar",
    "Confirmado - Transportadora": "/adicionar-placas",
    "Confirmado - Remessa": "/documentos",
    "Confirmado - Pesagem": "/documentos",
    "Confirmado - Faturamento": "/documentos",
    "Em transito": "/registrar-chegada",
    Rejeitado: "/editar",
    "Chegada Registrada": "/validar-chegada",
    "Parcialmente processado": "/create-destination",
    "Chegada Validada": "/create-destination"
  };

  return redirectUrlsMap[status];
};

export const decineToolTip = (status: string): string => {
  const toolTipMap = {
    Nova: "Aprovar/Recusar requisição",
    "Confirmado - Transportadora": "Adicionar placas do veículo",
    "Confirmado - Remessa": "Adicionar documentos",
    "Confirmado - Pesagem": "Adicionar documentos",
    "Confirmado - Faturamento": "Adicionar documentos",
    "Em transito": "Registrar chegada",
    Rejeitado: "Editar Requisição",
    "Chegada Registrada": "Validar chegada",
    "Parcialmente processado": "Informar consumo",
    "Chegada Validada": "Informar consumo"
  };

  return toolTipMap[status];
};

export const decideSubtitleByUrl = (status: string): string => {
  const subtitlesMap = {
    pending: "Pendentes",
    confirmed_shipping: "Confirmadas",
    documents: "Documentação Necessária",
    transit: "Em Trânsito",
    received: "Recebidas",
    reject: "Rejeitadas"
  };

  return subtitlesMap[status];
};
