export function organizeArray(a, b) {
  const { data: first_data } = a;
  const { data: second_data } = b;
  const firstDataTime = new Date(first_data).getTime();
  const secondDataTime = new Date(second_data).getTime();
  if (firstDataTime < secondDataTime) return -1;
  if (firstDataTime > secondDataTime) return 1;
  return 0;
}

// Pego os items que estão dentro do range para atualizar
export function filterByProcess(results = [], value) {
  let prevTotal = 0;
  let hasDone = false;
  const items = [];

  results.forEach(item => {
    const { peso_liquido, consumo } = item;
    if (!hasDone) {
      items.push(item);
    }
    prevTotal = prevTotal + (peso_liquido - consumo);
    if (prevTotal >= value) {
      hasDone = true;
    }
  });

  return items;
}

// Atualizo a quantidade processada
export function updateItems(itemsToUpdate, processada) {
  let processamentoParcial = processada;
  const itemUpdated = itemsToUpdate.map(item => {
    const { peso_liquido, consumo } = item;
    if (peso_liquido === consumo) {
      return item;
    }
    const processamentoPendente = peso_liquido - consumo;
    let quantidadeProcessada;
    let saldo;
    let consumo_;
    let consumo_da_requisicao;
    if (processamentoParcial >= processamentoPendente) {
      quantidadeProcessada = peso_liquido;
      processamentoParcial = processamentoParcial - processamentoPendente;
      saldo = 0;
      consumo_ = peso_liquido;
      consumo_da_requisicao = processamentoPendente;
    } else {
      quantidadeProcessada = processamentoParcial;
      saldo = peso_liquido - (quantidadeProcessada + consumo);
      consumo_ = quantidadeProcessada + consumo;
      consumo_da_requisicao = quantidadeProcessada;
    }
    return { ...item, consumo: consumo_, saldo, consumo_da_requisicao };
  });

  return itemUpdated;
}
