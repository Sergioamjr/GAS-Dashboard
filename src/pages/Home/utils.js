//@flow

interface ReturnedType {
  name: string;
  color: string;
  icon: string;
  value: string;
  to: string;
}

const returnDashboardDetails = (status: string, value: any): ReturnedType => {
  const detailsMap = {
    pending: {
      name: "Pendentes",
      color: "#88a538",
      to: "/requisicoes/pending",
      icon: "far fa-thumbs-up",
      value
    },
    transit: {
      name: "Em trânsito",
      color: "#88a538",
      to: "/requisicoes/transit",
      icon: "fas fa-truck",
      value
    },
    reject: {
      name: "Rejeitadas",
      color: "#88a538",
      to: "/requisicoes/reject",
      icon: "fas fa-window-close",
      value
    },
    confirmed_shipping: {
      name: "Confirmadas",
      color: "#88a538",
      to: "/requisicoes/confirmed_shipping",
      icon: "fas fa-check",
      value
    },
    documents: {
      name: "Documentos pendentes",
      color: "#88a538",
      to: "/requisicoes/documents",
      icon: "fas fa-file-alt",
      value
    },
    received: {
      name: "Recebidas",
      color: "#88a538",
      to: "/requisicoes/received",
      icon: "fas fa-check-double",
      value
    },
    partially_processed: {
      name: "Parcialmente Processadas",
      color: "#88a538",
      to: "/create-destination",
      icon: "fas fa-calculator",
      value
    },
    validates: {
      name: "Validadas",
      color: "#88a538",
      to: "/create-destination",
      icon: "fas fa-calculator",
      value
    },
    fullyprocessed: {
      name: "Totalmente Processadas",
      color: "#88a538",
      to: "",
      icon: "fas fa-calculator",
      value
    }
  };

  return detailsMap[status];
};

export default returnDashboardDetails;

//  pending, transit, reject, confirmed_shipping, documents, received, fullyprocessed, partially_processed;
