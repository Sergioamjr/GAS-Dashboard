import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";

const stateDefault = {
  data: {
    nome: "",
    telefone: "",
    cidade: "",
    nascimento: "",
    telefone_de_emergencia: "",
    nome_de_emergencia: ""
  }
};

class Profile extends React.Component {
  state = {
    ...stateDefault
  };

  onChangeHandler = ({ target: { name, value } }) =>
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  render() {
    return (
      <PageWrapper>
        <FromGroup title="Meu Cadastro">
          <div className="p-15 p-bottom-0">
            <div className="grid">
              <div className="sm-6-12">
                <Input
                  label="Nome:"
                  name="nome"
                  onChange={this.onChangeHandler}
                  value={this.state.data.nome}
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="sm-6-12">
                <Input
                  label="Telefone:"
                  name="telefone"
                  onChange={this.onChangeHandler}
                  value={this.state.data.telefone}
                  placeholder="Digite seu telefone"
                />
              </div>
              <div className="sm-6-12">
                <Input
                  label="Cidade:"
                  name="cidade"
                  onChange={this.onChangeHandler}
                  value={this.state.data.cidade}
                  placeholder="Digite sua cidade"
                />
              </div>
              <div className="sm-6-12">
                <Input
                  label="Nascimento:"
                  name="nascimento"
                  onChange={this.onChangeHandler}
                  value={this.state.data.nascimento}
                  placeholder="Digite seu nascimento"
                />
              </div>
              <div className="sm-6-12">
                <Input
                  label="Telefone de Emergência:"
                  name="telefone_de_emergencia"
                  onChange={this.onChangeHandler}
                  value={this.state.data.telefone_de_emergencia}
                  placeholder="Digite um telefone de emergência"
                />
              </div>
              <div className="sm-6-12">
                <Input
                  label="Nome do contato de emergência:"
                  name="nome_de_emergencia"
                  onChange={this.onChangeHandler}
                  value={this.state.data.nome_de_emergencia}
                  placeholder="Digite o nome do contato de emergência"
                />
              </div>
            </div>
          </div>
        </FromGroup>
        <div className="d-flex d-flex-space-between">
          <div>
            <Button type="primary">Salvar</Button>
            <Button className="m-left-10">Editar</Button>
          </div>
          <Button type="danger">Excluir meu perfil</Button>
        </div>
      </PageWrapper>
    );
  }
}

export default Profile;
