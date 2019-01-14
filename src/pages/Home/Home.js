import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { NavLink } from "react-router-dom";
import ProfileForm from "../../components/ProfileForm";
import ActionInfo from "../../components/ActionInfo/ActionInfo";

const stateDefault = {
  data: {
    nome: "",
    telefone: "",
    cidade: "",
    nascimento: "",
    telefone_de_emergencia: "",
    nome_de_emergencia: ""
  },
  action: {
    modelo_do_carro: "",
    ira_de_carro: true,
    autoriza: true,
    primeira_vez_no_gas: false
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

  onChangeActionHandler = ({ target: { name, value } }, reset = {}) => {
    this.setState({
      action: {
        ...this.state.action,
        [name]: value,
        ...reset
      }
    });
  };

  onQueryPartners = ({ target: { value } }) => {
    this.setState({ partners: { ...this.state.partners, value } });
  };
  render() {
    return (
      <PageWrapper title="Voluntariar-se">
        <h2 className="fw-300 color-theme m-bottom-30">
          Data da próxima entrega:{" "}
          <span className="fw-bold_ d-block fs-3">08/02/2019</span>
        </h2>
        <div className="m-bottom-20 background-success color-white p-center p-10">
          Você já está cadastrado.
        </div>
        <div className="m-bottom-40">
          <FromGroup
            title="Confirme seus dados pessoais"
            formName="Dados do voluntário"
          >
            <ActionInfo
              {...this.state.action}
              onChangeHandler={this.onChangeActionHandler}
            />
          </FromGroup>
          <FromGroup
            title="Confirme seus dados pessoais"
            formName="Dados do voluntário"
          >
            <ProfileForm
              {...this.state.data}
              onChangeHandler={this.onChangeHandler}
            />
          </FromGroup>

          <div className="d-flex d-flex-space-between">
            <div>
              <Button type="primary">Salvar</Button>
              <Button className="m-left-10">Editar</Button>
            </div>
            <Button>Editar Perfil</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default Profile;
