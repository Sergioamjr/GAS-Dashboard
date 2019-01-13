const CreateDistMock = [
  {
    id: "41243",
    origin: "Item 1",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 30,
    consumo: 20,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Item 2",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 20,
    consumo: 15,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Item 3",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 30,
    consumo: 30,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "item 4",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 5,
    consumo: 2,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Uberlândia",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 10,
    consumo: 0,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Uberlândia",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 22000,
    consumo: 0,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Uberlândia",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 22000,
    consumo: 0,
    status: "Pendente"
  },
  {
    id: "41243",
    origin: "Uberlândia",
    destiny: "Cereale Brasil",
    collect_date: "10/12/1990",
    material: "Milho tratado",
    peso_liquido: 22000,
    consumo: 0,
    status: "Pendente"
  }
];

const processada = 12;

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

const itemsToUpdate = filterByProcess(CreateDistMock, processada);
// console.log("itemsToUpdate", itemsToUpdate);

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
    let consumo_da_req;
    if (processamentoParcial >= processamentoPendente) {
      quantidadeProcessada = peso_liquido;
      processamentoParcial = processamentoParcial - processamentoPendente;
      saldo = 0;
      consumo_ = peso_liquido;
      consumo_da_req = processamentoPendente;
    } else {
      console.log(processamentoParcial);
      quantidadeProcessada = processamentoParcial;
      saldo = peso_liquido - (quantidadeProcessada + consumo);
      consumo_ = quantidadeProcessada + consumo;
      consumo_da_req = quantidadeProcessada;
    }
    return {
      ...item,
      consumo: consumo_,
      saldo,
      consumo_da_ordem: processada,
      consumo_da_req
    };
  });

  return itemUpdated;
}

const objectUpdated = updateItems(itemsToUpdate, processada);
console.log(objectUpdated);
/*

Total processada,
total da req,
total da req processada

*/
