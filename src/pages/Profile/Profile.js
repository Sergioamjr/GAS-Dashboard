import React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import ProfileForm from '../../components/ProfileForm';
import PartnesForm from '../../components/PartnesForm';
import {
  searchUser,
  addUserAsPartner,
  getPartners,
  removeUserAsPartner,
  getUserInfo,
  updateUser
} from '../../services/user';
import _get from 'lodash/get';
import { getAuth } from '../../services/localStorage';
import {
  updateMessage,
  updateErrorMessage
} from '../../redux/store/Feedback/feedback';
import { getRotas } from '../../services/data-de-entrega';

const partnersDefault = {
  isQuerying: false,
  isAdding: false,
  isRemoving: false,
  value: '',
  results: [],
  adds: []
};

const stateDefault = {
  data: {
    queryUser: false,
    _id: '',
    nome: '',
    sobrenome: '',
    telefone: '',
    cidade: '',
    nascimento: '',
    numeroDeEmergencia: '',
    nomeDeEmergencia: '',
    rotaDefault: '',
    lider: false
  },
  isLoading: false,
  isEditing: false,
  partners: partnersDefault,
  rotas: []
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
          const urlID = _get(this.props, 'match.params.id');
          const { _id } = await getAuth();
          const queryID = urlID || _id;
          const { user } = await getUserInfo(queryID);

          const { rotas } = await getRotas();
          this.setState({
            rotas,
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
          const { _id } = await getAuth();
          const urlID = _get(this.props, 'match.params.id');
          const queryID = urlID || _id;
          const { partners } = await getPartners(queryID);
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
          const search = _get(this.state, 'partners.value');
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
          const urlID = _get(this.props, 'match.params.id');
          const queryID = urlID || _id;
          const promises = [
            addUserAsPartner({
              _id: queryID,
              partner_id
            }),
            addUserAsPartner({
              _id: partner_id,
              partner_id: queryID
            })
          ];
          await Promise.all(promises);
          this.setState(
            { partners: partnersDefault, isEditing: false },
            this.fetchPartners
          );
          this.props.dispatch(updateMessage('Adicionado com sucesso.'));
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
          const urlID = _get(this.props, 'match.params.id');
          const queryID = urlID || _id;
          const promises = [
            removeUserAsPartner({
              _id: queryID,
              idToRemove
            }),
            removeUserAsPartner({
              _id: idToRemove,
              idToRemove: queryID
            })
          ];
          await Promise.all(promises);
          this.setState({ partners: partnersDefault }, this.fetchPartners);
          this.props.dispatch(updateMessage('Removido com sucesso.'));
        } catch (error) {}
      }
    );
  };

  filterResultsToAdd = () => {
    const {
      partners: { results, adds }
    } = this.state;
    const userID = _get(this.state, 'data._id');
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
          await updateUser({ ...this.state.data });
          this.setState({ isLoading: false, isEditing: false });
          this.props.dispatch(updateMessage('Perfil alterado com sucesso.'));
        } catch (error) {}
      }
    );
  };

  onEditHandler = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  onBackHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const partnersToShow = this.filterResultsToAdd();
    const urlID = _get(this.props, 'match.params.id');
    return (
      <PageWrapper title='Dados Pessoais'>
        <div className='m-bottom-40'>
          <FromGroup title='Dados pessoais' formName='Dados do voluntário'>
            <ProfileForm
              {...this.state.data}
              rotas={this.state.rotas}
              isDisabled={this.state.isEditing}
              onChangeHandler={this.onChangeHandler}
            />
          </FromGroup>
          <FromGroup title='Conjugue e familiares no GAS'>
            <PartnesForm
              {...this.state.partners}
              results={partnersToShow}
              isDisabled={this.state.isEditing}
              removePartner={this.removePartnerHandler}
              addPartner={this.addPartnerHandler}
              onChange={this.onQueryPartners}
            />
          </FromGroup>
          <div className='d-flex d-flex-space-between'>
            <div>
              {urlID && <Button onClick={this.onBackHandler}>Voltar</Button>}
              {!this.state.isEditing ? (
                <Button onClick={this.onEditHandler} className='m-left-10'>
                  Editar
                </Button>
              ) : (
                <div>
                  <Button onClick={this.onUpdateUser} type='primary'>
                    Salvar
                  </Button>
                  <Button onClick={this.onEditHandler} className='m-left-10'>
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
            {/* <Button type='danger'>Alterar minha senha</Button> */}
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default Profile;
