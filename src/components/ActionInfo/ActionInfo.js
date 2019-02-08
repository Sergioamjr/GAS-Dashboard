import React from "react";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";

class ActionInfo extends React.Component {
  render() {
    return (
      <div className="p-15 p-bottom-0">
        <div className="grid">
          <div className="sm-3-12">
            <label
              htmlFor="primeira_vez_no_gas"
              className="label d-block m-bottom-60"
            >
              Será sua primeira vez no GAS?
            </label>
            <div className="m-top-10 m-bottom-10">
              <Checkbox
                label="Sim"
                name="primeira_vez_no_gas"
                onChange={this.props.onChangeHandler}
                checked={this.props.primeira_vez_no_gas}
              />
            </div>
          </div>
          <div className="sm-3-12">
            <label htmlFor="ira_de_carro" className="label d-block m-bottom-60">
              Você irá de carro?
            </label>
            <div className="m-top-10 m-bottom-10">
              <Checkbox
                label="Sim"
                name="ira_de_carro"
                onChange={e =>
                  this.props.onChangeHandler(e, { modelo_do_carro: "" })
                }
                checked={this.props.ira_de_carro}
              />
            </div>
          </div>

          <div className="sm-6-12">
            <Input
              disabled={!this.props.ira_de_carro}
              label="Modelo do carro:"
              name="modelo_do_carro"
              onChange={this.props.onChangeHandler}
              value={this.props.modelo_do_carro}
              placeholder="Digite o modelo do seu carro"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ActionInfo;
