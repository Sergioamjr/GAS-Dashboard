// @flow

import * as React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Login as LoginService } from '../../services/login';
import { setAuth } from '../../services/localStorage';
import type { BrowserHistory } from 'history';
import _get from 'lodash/get';
import { UpdateUser } from '../../redux/store/User/User';

type State = {
  data: {
    email: string,
    password: string
  },
  hasError: boolean,
  isSubmiting: boolean
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
  isSubmiting: false
};

class Login extends React.Component<Props, State> {
  state = {
    ...stateDefault
  };

  // componentDidMount = async () => {
  //   try {
  //     const { email } = await getAuth();
  //     if (email) {
  //       this.redirectToHome();
  //     }
  //   } catch (error) {}
  // };

  onChangeHandler = (input: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = input;
    this.setState({
      ...stateDefault,
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

  render() {
    const hasValidForm = this.validateLoginForm();
    return (
      <div className='full-screen background-dark'>
        <div className='max-width-container'>
          <div className='d-flex d-flex-centered d-flex-column full-height  '>
            <h2 className='m-bottom-20 fs6 fw-300 color-white raleway'>GAS</h2>
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
                {this.state.hasError && (
                  <p className='color-danger m-bottom-20 p-center'>
                    Usuário ou senha incorretas.
                  </p>
                )}

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
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
