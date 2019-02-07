import React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import { NavLink } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm';
import ActionInfo from '../../components/ActionInfo/ActionInfo';
import { getAuth } from '../../services/localStorage';
import { getUserInfo } from '../../services/user';

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
    nomeDeEmergencia: ''
  },
  action: {
    modelo_do_carro: '',
    ira_de_carro: true,
    autoriza: true,
    primeira_vez_no_gas: false
  }
};

class Profile extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    this.fetchUserInfo();
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
      <PageWrapper title='Voluntariar-se'>
        <h2 className='fw-300 color-theme m-bottom-30'>
          Data da próxima entrega:{' '}
          <span className='fw-bold_ d-block fs-3'>08/02/2019</span>
        </h2>
        <div className='m-bottom-20 background-success color-white p-center p-10'>
          Você já está cadastrado na próxima entrega.
        </div>
        <div className='m-bottom-40'>
          <FromGroup
            title='Confirme seus dados pessoais'
            formName='Dados do voluntário'
          >
            <ActionInfo
              {...this.state.action}
              onChangeHandler={this.onChangeActionHandler}
            />
          </FromGroup>
          <FromGroup
            title='Confirme seus dados pessoais'
            formName='Dados do voluntário'
          >
            <ProfileForm
              {...this.state.data}
              disabledAll
              onChangeHandler={this.onChangeHandler}
            />
          </FromGroup>

          <div className='d-flex d-flex-space-between'>
            <div>
              <Button type='primary'>Salvar</Button>
              <Button className='m-left-10'>Editar</Button>
            </div>
            <NavLink to='/meu-perfil'>
              <Button>Editar Perfil</Button>
            </NavLink>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default Profile;
