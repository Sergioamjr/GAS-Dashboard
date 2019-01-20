import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";
import ProfileForm from "../../components/ProfileForm";
import PartnesForm from "../../components/PartnesForm";
import {
  searchUser,
  addUserAsPartner,
  getPartners,
  removeUserAsPartner,
  getUserInfo,
  updateUser
} from "../../services/user";
import _get from "lodash/get";
import { getAuth } from "../../services/localStorage";
import {
  updateMessage,
  updateErrorMessage
} from "../../redux/store/Feedback/feedback";

const partnersDefault = {
  isQuerying: false,
  isAdding: false,
  isRemoving: false,
  value: "",
  results: [],
  adds: []
};

const stateDefault = {
  data: {
    queryUser: false,
    _id: "",
    nome: "",
    sobrenome: "",
    telefone: "",
    cidade: "",
    nascimento: "",
    numeroDeEmergencia: "",
    nomeDeEmergencia: ""
  },
  isLoading: false,
  partners: partnersDefault
};

class Profile extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    this.fetchUserInfo();
    this.fetchPartners();
  };

  fetchUserInfo = () => {
    this.setState(
      { data: { ...this.state.data, queryUser: true } },
      async () => {
        try {
          const { _id } = await getAuth();
          const { user } = await getUserInfo(_id);
          this.setState({
            data: {
              ...this.state.data,
              ...user,
              queryUser: false
            }
          });
        } catch (error) {}
      }
    );
  };

  fetchPartners = () => {
    this.setState(
      { partners: { ...this.state.partners, isQuerying: true } },
      async () => {
        try {
          const { _id, token } = await getAuth();
          const { partners } = await getPartners(_id);
          this.setState({
            partners: {
              ...this.state.partners,
              adds: partners,
              isQuerying: false
            }
          });
        } catch (error) {}
      }
    );
  };

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  fetchSearchUser = () => {
    this.setState(
      { partners: { ...this.state.partners, isQuerying: true } },
      async () => {
        try {
          const search = _get(this.state, "partners.value");
          const { user } = await searchUser(search);
          this.setState({
            partners: {
              ...this.state.partners,
              results: user,
              isQuerying: false
            }
          });
        } catch (error) {}
      }
    );
  };

  onQueryPartners = ({ target: { value } }) => {
    this.setState(
      { partners: { ...this.state.partners, results: [], value } },
      () => {
        if (value.length > 4) {
          this.fetchSearchUser();
        }
      }
    );
  };

  addPartnerHandler = (partner_id, event) => {
    event.preventDefault();
    this.setState(
      {
        partners: { ...this.state.partners, isAdding: true }
      },
      async () => {
        try {
          const { _id } = await getAuth();
          const promises = [
            addUserAsPartner({
              _id,
              partner_id
            }),
            addUserAsPartner({
              _id: partner_id,
              partner_id: _id
            })
          ];
          await Promise.all(promises);
          this.setState({ partners: partnersDefault }, this.fetchPartners);
          this.props.dispatch(updateMessage("Adicionado com sucesso."));
        } catch (error) {}
      }
    );
  };

  removePartnerHandler = (idToRemove, event) => {
    event.preventDefault();
    this.setState(
      {
        partners: { ...this.state.partners, isRemoving: true }
      },
      async () => {
        try {
          const { _id } = await getAuth();
          const promises = [
            removeUserAsPartner({
              _id,
              idToRemove
            }),
            removeUserAsPartner({
              _id: idToRemove,
              idToRemove: _id
            })
          ];
          await Promise.all(promises);
          this.setState({ partners: partnersDefault }, this.fetchPartners);
          this.props.dispatch(updateMessage("Removido com sucesso."));
        } catch (error) {}
      }
    );
  };

  filterResultsToAdd = () => {
    const {
      partners: { results, adds }
    } = this.state;
    const userID = _get(this.state, "data._id");
    return results.filter(({ _id }) => {
      let returned = true;
      adds.forEach(({ _id: add_id }) => {
        if (_id === add_id) {
          returned = false;
        }
      });
      if (_id === userID) {
        returned = false;
      }

      return returned;
    });
  };

  onUpdateUser = () => {
    this.setState(
      {
        isLoading: true
      },
      async () => {
        try {
          console.log(this.state.data);
          await updateUser({ ...this.state.data });
          this.setState({ isLoading: false });
        } catch (error) {}
      }
    );
  };

  render() {
    const partnersToShow = this.filterResultsToAdd();
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
              results={partnersToShow}
              removePartner={this.removePartnerHandler}
              addPartner={this.addPartnerHandler}
              onChange={this.onQueryPartners}
            />
          </FromGroup>
          <div className="d-flex d-flex-space-between">
            <div>
              <Button onClick={this.onUpdateUser} type="primary">
                Salvar
              </Button>
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
