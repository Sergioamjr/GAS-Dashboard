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
import { hasValidToken, CreateLoginWithFacebook } from '../../services/user';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { updateErrorMessage } from '../../redux/store/Feedback/feedback';
import Toaster from '../../components/Toaster';

type State = {
  data: {
    email: string,
    password: string
  },
  hasError: boolean,
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
  hasError: false,
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
            isSubmiting: false,
            hasError: true
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
            sobrenome: ''
          });
          this.props.dispatch(UpdateUser(user));
          await setAuth(user);
          this.redirectToHome();
        } catch (error) {
          this.props.dispatch(
            updateErrorMessage('Usuário ou senha inválidos.')
          );
          this.setState({
            isSubmiting: false,
            hasError: true
          });
        }
      }
    );
  };

  render() {
    const hasValidForm = this.validateLoginForm();
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
                    {/* {this.state.hasError && (
                      <p className='color-danger m-bottom-20 p-center'>
                        Usuário ou senha incorretas.
                      </p>
                    )} */}

                    <Button
                      loading={this.state.isSubmiting ? 1 : 0}
                      disabled={hasValidForm}
                      type='primary'
                      onClick={this.onSubmitHandler}
                    >
                      Entrar
                    </Button>
                  </div>
                </FromGroup>
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
