//@flow

const filterByStatusToDashboard = (requests: any[]): any => {
  const formatted = requests.reduce(
    (acc, cur) => {
      const pending = requests.filter(({ status }) => status === "Nova").length;
      const transit = requests.filter(({ status }) => status === "Em transito")
        .length;
      const reject = requests.filter(({ status }) => status === "Rejeitado")
        .length;
      const confirmed_shipping = requests.filter(
        ({ status }) => status === "Confirmado - Transportadora"
      ).length;
      const documents = requests.filter(({ status }) =>
        [
          "Confirmado - Remessa",
          "Confirmado - Pesagem",
          "Confirmado - Faturamento"
        ].includes(status)
      ).length;
      const received = requests.filter(
        ({ status }) => status === "Chegada Registrada"
      ).length;
      const fullyprocessed = requests.filter(
        ({ status }) => status === "Totalmente processado"
      ).length;
      const partially_processed = requests.filter(
        ({ status }) => status === "Parcialmente processado"
      ).length;

      const validates = requests.filter(
        ({ status }) => status === "Chegada Registrada"
      ).length;

      return {
        pending,
        reject,
        confirmed_shipping,
        documents,
        transit,
        received,
        validates,
        partially_processed,
        fullyprocessed
      };
    },
    {
      pending: 0,
      transit: 0,
      reject: 0,
      confirmed_shipping: 0,
      documents: 0,
      received: 0,
      fullyprocessed: 0,
      partially_processed: 0,
      validates: 0
    }
  );

  return formatted;
};

export default filterByStatusToDashboard;
