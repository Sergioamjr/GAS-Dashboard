import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";
import ProfileForm from "../../components/ProfileForm";
import PartnesForm from "../../components/PartnesForm";

const stateDefault = {
  data: {
    nome: "",
    telefone: "",
    cidade: "",
    nascimento: "",
    telefone_de_emergencia: "",
    nome_de_emergencia: ""
  },
  partners: {
    isQuerying: false,
    value: "",
    results: [],
    adds: []
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

  onQueryPartners = ({ target: { value } }) => {
    this.setState({ partners: { ...this.state.partners, value } });
  };
  render() {
    return (
      <PageWrapper title="Dados Pessoais">
        <div className="m-bottom-40">
          <FromGroup title="Dados pessoais" formName="Dados do voluntário">
            <ProfileForm
              {...this.state.data}
              onChangeHandler={this.onChangeHandler}
            />
          </FromGroup>
          <FromGroup title="Conjugue e familiares no GAS">
            <PartnesForm
              {...this.state.partners}
              onChange={this.onQueryPartners}
            />
          </FromGroup>
          <div className="d-flex d-flex-space-between">
            <div>
              <Button type="primary">Salvar</Button>
              <Button className="m-left-10">Editar</Button>
            </div>
            <Button type="danger">Alterar minha senha</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default Profile;
