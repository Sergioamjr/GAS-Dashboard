//@flow

const calcQuantityToProcess = (params: any): any => {
  return params.reduce(
    (prev, cur) => {
      const { peso_liquido, consumo = 0 } = cur;
      const { total, processed, pendent } = prev;
      return {
        total: total + peso_liquido,
        processed: processed + consumo,
        pendent: pendent + (peso_liquido - consumo)
      };
    },
    { total: 0, processed: 0, pendent: 0 }
  );
};

export default calcQuantityToProcess;
