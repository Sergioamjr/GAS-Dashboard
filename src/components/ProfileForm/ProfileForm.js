import React from "react";
import Input from "../Input/Input";

class ProfileForm extends React.Component {
  render() {
    return (
      <div className="p-15 p-bottom-0">
        <div className="grid">
          <div className="sm-6-12">
            <Input
              label="Nome:"
              name="nome"
              onChange={this.props.onChangeHandler}
              value={this.props.nome}
              placeholder="Digite seu nome"
            />
          </div>
          <div className="sm-6-12">
            <Input
              label="Telefone:"
              name="telefone"
              onChange={this.props.onChangeHandler}
              value={this.props.telefone}
              placeholder="Digite seu telefone"
            />
          </div>
          <div className="sm-6-12">
            <Input
              label="Cidade:"
              name="cidade"
              onChange={this.props.onChangeHandler}
              value={this.props.cidade}
              placeholder="Digite sua cidade"
            />
          </div>
          <div className="sm-6-12">
            <Input
              label="Nascimento:"
              name="nascimento"
              onChange={this.props.onChangeHandler}
              value={this.props.nascimento}
              placeholder="Digite seu nascimento"
            />
          </div>
          <div className="sm-6-12">
            <Input
              label="Telefone de Emergência:"
              name="telefone_de_emergencia"
              onChange={this.props.onChangeHandler}
              value={this.props.telefone_de_emergencia}
              placeholder="Digite um telefone de emergência"
            />
          </div>
          <div className="sm-6-12">
            <Input
              label="Nome do contato de emergência:"
              name="nome_de_emergencia"
              onChange={this.props.onChangeHandler}
              value={this.props.nome_de_emergencia}
              placeholder="Digite o nome do contato de emergência"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
