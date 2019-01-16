import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

class PartnesForm extends React.Component {
  render() {
    const { results, adds, isQuerying, addPartner } = this.props;
    return <div className="p-15 p-bottom-0">
        <div className="grid">
          {adds.length > 0 && <div className="sm-12-12">
              <p className="label">Pessoas já adicionadas:</p>
              <ul className="sm-column-count-2 m-bottom-15">
                {adds.map((add, index) => {
                  const { name, _id } = add;
                  return <li className="d-flex d-flex-space-between d-flex-align-center p-5 background-lighter m-bottom-10">
                      <p>Natália Fazzolari</p>
                      <Button small type="danger">
                        Remover
                      </Button>
                    </li>;
                })}
              </ul>
            </div>}
          <div className="sm-12-12">
            <Input label="Pesquisar conjugue e familiares no GAS:" name="nome_do_parceiro" onChange={this.props.onChange} value={this.props.value} errorMessage="Digite pelo menos 5 caracteres" hasError={this.props.value && this.props.value.length < 5} placeholder="Digite o nome do conjugue ou familiar no GAS" />
          </div>
          {isQuerying && (<div className="p-center m-bottom-20">
             <i className="fas fa-spinner fs-4 color-primary rotate" />
           </div>)}
          {!isQuerying && results.length > 0 && <div className="sm-12-12">
              <div>
                <p className="label">Pessoas encontradas:</p>
                <ul className="sm-column-count-2 md-column-count-3 m-bottom-15">
                  {results.map((result, index) => {
                    const { nome, sobrenome, _id } = result;

                    return <li key={index} className="d-flex d-flex-space-between d-flex-align-center p-5 background-lighter m-bottom-10">
                        <p>{`${nome} ${sobrenome}`}</p>
                        <Button onClick={(e) => addPartner(_id, e)} small type="primary">
                          Adicionar
                        </Button>
                      </li>;
                  })}
                </ul>
              </div>
            </div>}
        </div>
      </div>;
  }
}

export default PartnesForm;
