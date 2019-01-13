// //@flow

// import * as React from "react";
// import PageWrapper from "../../components/PageWrapper/";
// import moment from "moment";
// import Button from "../../components/Button/Button";
// import { NavLink } from "react-router-dom";
// import FromGroup from "../../components/FormGroup/FormGroup";
// import Input from "../../components/Input/Input";
// import DatePicker from "../../components/DatePicker/DatePicker";
// import calcQuantityToProcess from "../../utils/calcQuantityToProcess";
// import { getPesageList, registrarConsumo } from "../../services/requisicoes";
// import { filterByProcess, updateItems, organizeArray } from "./utils";
// import { logError } from "../RequestForm/utils/index";
// import { updateMessage } from "../../redux/store/Feedback/feedback";
// import _get from "lodash/get";

// type Props = {
//   dispatch: any
// };
// type State = {
//   isLoading: boolean,
//   isSubmiting: boolean,
//   data: {
//     results: any,
//     value: number,
//     newID: number,
//     date: any
//   }
// };

// const stateDefault = {
//   isLoading: true,
//   isSubmiting: false,
//   data: {
//     results: [],
//     value: 0,
//     newID: 0,
//     date: moment().utc()
//   }
// };

// class CreateDist extends React.Component<Props, State> {
//   state = {
//     ...stateDefault
//   };

//   componentDidMount() {
//     this.fetchPendingList();
//   }

//   fetchPendingList() {
//     this.setState(
//       {
//         isLoading: true,
//         isSubmiting: false
//       },
//       async () => {
//         try {
//           const { requisicoes } = await getPesageList();
//           this.setState({
//             isLoading: false,
//             data: {
//               ...this.state.data,
//               results: requisicoes,
//               value: 0,
//               newID: new Date().getTime()
//             }
//           });
//         } catch (error) {}
//       }
//     );
//   }

//   onChangeHandler = (e: any) => {
//     const {
//       target: { value, name }
//     } = e;
//     this.setState({
//       data: {
//         ...this.state.data,
//         [name]: value
//       }
//     });
//   };

//   onSaveHandler = (results: any): void => {
//     const allPromise = [];
//     const { date, newID: id_consumo, value } = _get(this.state, "data");
//     results.forEach(result => {
//       allPromise.push(
//         registrarConsumo({
//           ...result,
//           id_consumo,
//           date,
//           consumo_da_ordem: value
//         })
//       );
//     });

//     this.setState(
//       {
//         isSubmiting: true
//       },
//       async () => {
//         try {
//           await Promise.all(allPromise);
//           this.props.dispatch(updateMessage("Consumo registrado com sucesso."));
//           this.fetchPendingList();
//         } catch (error) {
//           this.setState(
//             {
//               isSubmiting: false
//             },
//             () => {
//               logError(error, "CreateDist.onSaveHandler");
//             }
//           );
//         }
//       }
//     );
//   };

//   calcToProcess = () => {
//     const { results, value } = _get(this.state, "data");
//     const resultsByDate = results.sort(organizeArray);
//     const filtered = filterByProcess(resultsByDate, value);
//     const updated = updateItems(filtered, value);
//     // console.log("up", updated);
//     this.onSaveHandler(updated);
//   };

//   render() {
//     const {
//       isLoading,
//       data: { results, value }
//     } = this.state;

//     const { total, processed, pendent } = calcQuantityToProcess(results);
//     return (
//       <PageWrapper title="Registrar Consumo">
//         {isLoading && (
//           <div className="p-center">
//             <i className="fas fa-spinner fs-4 color-primary rotate" />
//           </div>
//         )}
//         {!isLoading && results.length === 0 && (
//           <p className="p-center w-100">Nada para processar.</p>
//         )}
//         {!isLoading && results.length > 0 && (
//           <div>
//             <div className="grid">
//               <div className="md-12-12">
//                 <FromGroup title="Registrar Consumo">
//                   <div className="p-15 p-bottom-0_">
//                     <div className="grid">
//                       <div className="sm-3-12">
//                         <Input
//                           label="Total:"
//                           name="value"
//                           disabled
//                           value={total}
//                           placeholder="Digite a quantidade processada"
//                         />
//                       </div>
//                       <div className="sm-3-12">
//                         <Input
//                           label="Total Processado:"
//                           name="value"
//                           disabled
//                           value={processed}
//                           placeholder="Digite a quantidade processada"
//                         />
//                       </div>
//                       <div className="sm-3-12">
//                         <Input
//                           label="Total Disponível:"
//                           name="value"
//                           disabled
//                           value={pendent}
//                           placeholder="Digite a quantidade processada"
//                         />
//                       </div>
//                       <div className="sm-3-12">
//                         <Input
//                           label="Quantidade Processada:"
//                           name="value"
//                           value={value || 0}
//                           onChange={({ target: { value } }) =>
//                             this.onChangeHandler({
//                               target: {
//                                 value: parseInt(value),
//                                 name: "value"
//                               }
//                             })
//                           }
//                           placeholder="Digite a quantidade processada"
//                         />
//                       </div>
//                       {false && (
//                         <div className="sm-3-12">
//                           <div className="m-bottom-20">
//                             <label className="label d-block">
//                               Data do processamento:
//                             </label>
//                             <DatePicker
//                               minDate={new Date()}
//                               dateFormat="dd/MM/yyyy"
//                               onChange={date =>
//                                 this.onChangeHandler({
//                                   target: {
//                                     value: moment(date)
//                                       .utc()
//                                       .format(),
//                                     name: "date"
//                                   }
//                                 })
//                               }
//                               value={new Date(this.state.data.date)}
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <Button
//                       onClick={this.calcToProcess}
//                       className="m-bottom-15_"
//                       type="primary"
//                     >
//                       Salvar
//                     </Button>
//                   </div>
//                 </FromGroup>
//               </div>

//               <div className="md-12-12">
//                 <div className="table-wrapper m-bottom-20">
//                   <h2 className="fw-300 m-bottom-10 color-theme">
//                     Requisições para consumo
//                   </h2>
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th className="fs-7" />
//                         <th className="fs-7">Peso Líquido</th>
//                         <th className="fs-7">Remessa</th>
//                         <th className="fs-7">Data de Entrada</th>
//                         <th className="fs-7">Restante (kg)</th>
//                         <th className="fs-7">Consumo (kg)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {results.map((result, index) => {
//                         const {
//                           peso_liquido,
//                           id,
//                           data,
//                           remessa,
//                           saldo
//                         } = result;

//                         return (
//                           <tr key={index}>
//                             <td className="fs-7">
//                               <NavLink to={`/consultar-req/${id}`}>
//                                 <Button icon type="primary">
//                                   <i className="fas fa-eye" />
//                                 </Button>
//                               </NavLink>
//                             </td>
//                             <td className="fs-7">{peso_liquido}</td>
//                             <td className="fs-7">{remessa}</td>
//                             <td className="fs-7">
//                               {moment(data).format("DD/MM/YYYY")}
//                             </td>
//                             <td className="fs-7">{saldo}</td>
//                             <td className="fs-7">
//                               {peso_liquido - saldo || 0}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//             {false && (
//               <div className="d-flex d-flex-space-end">
//                 <p className="m-right-20">
//                   Total: <b>{total}</b>
//                 </p>
//                 <p className="m-right-20">
//                   Total Processada: <b> {processed} </b>
//                 </p>
//                 <p className="m-right-20">
//                   Total restante: <b> {pendent}</b>
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </PageWrapper>
//     );
//   }
// }

// export default CreateDist;
