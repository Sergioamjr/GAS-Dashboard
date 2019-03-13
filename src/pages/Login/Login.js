// @flow

import * as React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Login as LoginService } from '../../services/login';
import { setAuth, getAuth } from '../../services/localStorage';
import type { BrowserHistory } from 'history';
import _get from 'lodash/get';
import { UpdateUser } from '../../redux/store/User/User';
import Loading from '../../components/Loading/Loading';
import {
  hasValidToken,
  CreateLoginWithFacebook,
  CreateUser,
  RequestResetPassword
} from '../../services/user';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import {
  updateErrorMessage,
  updateMessage
} from '../../redux/store/Feedback/feedback';
import Toaster from '../../components/Toaster';
import Checkbox from '../../components/Checkbox/Checkbox';

type State = {
  data: {
    email: string,
    password: string
  },
  register: {
    nome: string,
    sobrenome: string,
    password: string,
    email: string,
    auth: boolean
  },
  recovery: {
    email: string
  },
  isSubmiting: boolean,
  hasAuth: boolean
};

type Props = {
  history: BrowserHistory,
  dispatch: any
};

const stateDefault = {
  data: {
    email: '',
    password: ''
  },
  register: {
    nome: '',
    sobrenome: '',
    password: '',
    email: '',
    auth: false
  },
  recovery: {
    email: ''
  },
  isSubmiting: false,
  hasAuth: true
};

class Login extends React.Component<Props, State> {
  state = {
    ...stateDefault
  };

  componentDidMount = async () => {
    try {
      const user = await getAuth();
      const token = _get(user, 'token', '');
      const { isValid } = await hasValidToken({ token });
      if (isValid) {
        this.redirectToHome();
      } else {
        this.setState({
          hasAuth: false
        });
      }
    } catch (error) {
      this.setState({
        hasAuth: false
      });
    }
  };

  onChangeHandler = (input: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = input;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  onRegisterChangeHandler = (input: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = input;
    this.setState({
      register: {
        ...this.state.register,
        [name]: value
      }
    });
  };

  onChangeRecoveryHandler = (input: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = input;
    this.setState({
      recovery: {
        ...this.state.register,
        [name]: value
      }
    });
  };

  redirectToHome = () => {
    this.props.history.push('/inicio');
  };

  onSubmitHandler = () => {
    this.setState(
      {
        isSubmiting: true
      },
      async () => {
        try {
          const user = await LoginService(this.state.data);
          const hasError = _get(user, 'error', false);
          if (hasError) {
            throw new Error();
          }
          this.props.dispatch(UpdateUser(user));
          await setAuth(user);
          this.redirectToHome();
        } catch (error) {
          this.props.dispatch(
            updateErrorMessage('Usuário ou senha inválidos.')
          );
          this.setState({
            isSubmiting: false
          });
        }
      }
    );
  };

  onCreateAccountHandler = () => {
    this.setState(
      {
        isSubmiting: true
      },
      async () => {
        try {
          const user = await CreateUser(this.state.register);
          const hasError = _get(user, 'error', false);
          if (hasError) {
            throw new Error();
          }
          this.props.dispatch(UpdateUser(user));
          await setAuth(user);
          this.redirectToHome();
        } catch (error) {
          const errorMessage = _get(
            error,
            'errorMessage',
            'Erro ao criar usuário.'
          );
          this.props.dispatch(updateErrorMessage(errorMessage));
          this.setState({
            isSubmiting: false
          });
        }
      }
    );
  };

  onRecoveryHandler = () => {
    this.setState(
      {
        isSubmiting: true
      },
      async () => {
        try {
          const { message } = await RequestResetPassword(this.state.recovery);

          this.props.dispatch(
            updateMessage(
              message || 'Foi enviado um email para recuperar sua senha.'
            )
          );
          this.setState({
            isSubmiting: false
          });
        } catch (error) {
          this.props.dispatch(updateErrorMessage('Erro ao recuperar senha.'));
          this.setState({
            isSubmiting: false
          });
        }
      }
    );
  };

  validateLoginForm = () => {
    const {
      data: { email, password }
    } = this.state;
    return !email || !password;
  };

  validateCreateAccount = () => {
    const {
      register: { nome, sobrenome, email, password, auth }
    } = this.state;
    return !nome || !sobrenome || !email || !password || !auth;
  };

  loginWithFacebook = (response: any) => {
    this.setState(
      {
        isSubmiting: true
      },
      async () => {
        try {
          const { name, email, userID } = response;

          const user = await CreateLoginWithFacebook({
            nome: name,
            email,
            password: userID,
            repassword: userID,
            sobrenome: '.'
          });
          this.props.dispatch(UpdateUser(user));
          await setAuth(user);
          this.redirectToHome();
        } catch (error) {
          this.props.dispatch(
            updateErrorMessage('Usuário ou senha inválidos.')
          );
          this.setState({
            isSubmiting: false
          });
        }
      }
    );
  };

  render() {
    const hasValidForm = this.validateLoginForm();
    const hasValidCreateAccount = this.validateCreateAccount();
    const { hasAuth } = this.state;

    return (
      <div className='full-screen background-gas'>
        <div className='max-width-container'>
          <div className='d-flex d-flex-centered d-flex-column full-height  '>
            <h2 className='m-bottom-20 fs6 fw-300 color-white background-logo'>
              GAS
            </h2>
            {hasAuth ? (
              <Loading />
            ) : (
              <div className='w-100'>
                {true && (
                  <FromGroup title='Faça login' hideIcon>
                    <div className='p-15 background-white'>
                      <Input
                        value={this.state.data.email}
                        label='Usuário'
                        name='email'
                        onChange={this.onChangeHandler}
                        placeholder='Digite seu usuário'
                      />
                      <Input
                        value={this.state.data.password}
                        label='Senha'
                        type='password'
                        name='password'
                        onChange={this.onChangeHandler}
                        placeholder='Digite sua senha'
                      />

                      <div className='d-flex d-flex-space-between d-flex-align-center'>
                        <Button
                          loading={this.state.isSubmiting ? 1 : 0}
                          disabled={hasValidForm}
                          type='primary'
                          onClick={this.onSubmitHandler}
                        >
                          Entrar
                        </Button>
                        <div>
                          <Button small onClick={this.onSubmitHandler}>
                            Recuperar Senha
                          </Button>
                          <Button
                            className='m-left-10'
                            small
                            onClick={this.onSubmitHandler}
                          >
                            Criar Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FromGroup>
                )}

                {false && (
                  <FromGroup title='Crie sua conta' hideIcon>
                    <div className='p-15 background-white'>
                      <div className='grid'>
                        <div className='sm-6-12'>
                          <Input
                            value={this.state.register.nome}
                            label='Nome'
                            name='nome'
                            onChange={this.onRegisterChangeHandler}
                            placeholder='Digite seu nome'
                          />
                        </div>
                        <div className='sm-6-12'>
                          <Input
                            value={this.state.register.sobrenome}
                            label='Sobrenome'
                            name='sobrenome'
                            onChange={this.onRegisterChangeHandler}
                            placeholder='Digite seu sobrenome'
                          />
                        </div>
                        <div className='sm-6-12'>
                          <Input
                            value={this.state.register.email}
                            label='Email'
                            name='email'
                            onChange={this.onRegisterChangeHandler}
                            placeholder='Digite seu email'
                          />
                        </div>

                        <div className='sm-6-12'>
                          <Input
                            value={this.state.register.password}
                            label='Senha'
                            type='password'
                            name='password'
                            onChange={this.onRegisterChangeHandler}
                            placeholder='Digite sua senha'
                          />
                        </div>
                        <div className='sm-12-12'>
                          <div className='m-bottom-20'>
                            <Checkbox
                              label='Autorizo divulgar minha imagem para ajudar a causa.'
                              name='auth'
                              onChange={this.onRegisterChangeHandler}
                              checked={this.state.register.auth}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='d-flex d-flex-space-between d-flex-align-center'>
                        <Button
                          loading={this.state.isSubmiting ? 1 : 0}
                          disabled={hasValidCreateAccount}
                          type='primary'
                          onClick={this.onCreateAccountHandler}
                        >
                          Criar Conta
                        </Button>
                        <div>
                          <Button small onClick={this.onSubmitHandler}>
                            Recuperar Senha
                          </Button>
                          <Button
                            className='m-left-10'
                            small
                            onClick={this.onSubmitHandler}
                          >
                            Fazer Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FromGroup>
                )}
                {false && (
                  <FromGroup title='Recuperar Senha' hideIcon>
                    <div className='p-15 background-white'>
                      <Input
                        value={this.state.recovery.email}
                        label='E-mail'
                        name='email'
                        onChange={this.onChangeRecoveryHandler}
                        placeholder='Digite seu e-mail'
                      />
                      <div className='d-flex d-flex-space-between d-flex-align-center'>
                        <Button
                          loading={this.state.isSubmiting ? 1 : 0}
                          disabled={!this.state.recovery.email}
                          type='primary'
                          onClick={this.onRecoveryHandler}
                        >
                          Recuperar Senha
                        </Button>
                        <div>
                          <Button small onClick={this.onSubmitHandler}>
                            Fazer Login
                          </Button>
                          <Button
                            className='m-left-10'
                            small
                            onClick={this.onSubmitHandler}
                          >
                            Criar Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FromGroup>
                )}
                <div className='p-center'>
                  <FacebookLogin
                    appId='120022385559001'
                    fields='name,email'
                    textButton='Entrar com Facebook'
                    disableMobileRedirect={true}
                    callback={this.loginWithFacebook}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
}

export default connect()(Login);
