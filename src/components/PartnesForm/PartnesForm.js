import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

class PartnesForm extends React.Component {
  render() {
    const {
      results,
      adds,
      isQuerying,
      addPartner,
      removePartner,
      value
    } = this.props;
    return (
      <div className="p-15 p-bottom-0">
        <div className="grid">
          {adds.length > 0 && (
            <div className="sm-12-12">
              <p className="label">Pessoas já adicionadas:</p>
              <div className="grid m-bottom-15">
                {adds.map((add, index) => {
                  const { nome, sobrenome, _id } = add;
                  return (
                    <div key={index} className="sm-6-12 ">
                      <div className="d-flex d-flex-space-between d-flex-align-center p-5 background-lighter m-bottom-10">
                        <p>{`${nome} ${sobrenome}`}</p>
                        <Button
                          onClick={e => removePartner(_id, e)}
                          small
                          type="danger"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {adds.length <= 1 && (
            <div className="sm-12-12">
              <Input
                label="Pesquisar conjugue e familiares no GAS:"
                name="nome_do_parceiro"
                onChange={this.props.onChange}
                value={this.props.value}
                errorMessage="Digite pelo menos 5 caracteres"
                hasError={this.props.value && this.props.value.length < 5}
                placeholder="Digite o nome do conjugue ou familiar no GAS"
              />
            </div>
          )}
          {isQuerying && (
            <div className="p-center m-bottom-20">
              <i className="fas fa-spinner fs-4 color-primary rotate" />
            </div>
          )}
          {!isQuerying && results.length > 0 && adds.length <= 1 && (
            <div>
              <p className="label">Pessoas encontradas:</p>
              <div className="grid">
                {results.map((result, index) => {
                  const { nome, sobrenome, _id } = result;
                  return (
                    <div key={index} className="sm-6-12 ">
                      <div className="d-flex d-flex-space-between d-flex-align-center p-5 background-lighter m-bottom-10">
                        <p>{`${nome} ${sobrenome}`}</p>
                        <Button
                          onClick={e => addPartner(_id, e)}
                          small
                          type="primary"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {!isQuerying && results.length === 0 && value.length > 4 && (
            <p className="p-center m-bottom-20 w-100">
              Nenhum voluntário encontrado.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default PartnesForm;
