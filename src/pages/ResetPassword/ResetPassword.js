// @flow

import * as React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import type { BrowserHistory } from 'history';
import _get from 'lodash/get';
import { ResetPassword as ResetPasswordService } from '../../services/user';
import { connect } from 'react-redux';
import {
  updateErrorMessage,
  updateMessageWithDelay
} from '../../redux/store/Feedback/feedback';
import Toaster from '../../components/Toaster';

type State = {
  data: {
    repassword: string,
    password: string
  },
  isSubmiting: boolean
};

type Props = {
  history: BrowserHistory,
  dispatch: any
};

const stateDefault = {
  data: {
    repassword: '',
    password: ''
  },
  isSubmiting: false
};

class ResetPassword extends React.Component<Props, State> {
  state = {
    ...stateDefault
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
    this.props.history.push('/');
  };

  onSubmitHandler = () => {
    this.setState(
      {
        isSubmiting: true
      },
      async () => {
        try {
          const token = _get(this.props, 'match.params.token');
          const { success } = await ResetPasswordService({
            ...this.state.data,
            token
          });

          this.props.dispatch(updateMessageWithDelay(success));
          this.redirectToHome();
        } catch (error) {
          this.props.dispatch(
            updateErrorMessage('Erro ao atualizar sua senha. Tente novamente.')
          );
          this.setState({
            isSubmiting: false
          });
        }
      }
    );
  };

  validateLoginForm = () => {
    const {
      data: { repassword, password }
    } = this.state;
    return !password || !repassword || password !== repassword;
  };

  render() {
    const hasValidForm = this.validateLoginForm();

    return (
      <div className='full-screen background-gas'>
        <div className='max-width-container'>
          <div className='d-flex d-flex-centered d-flex-column full-height  '>
            <h2 className='m-bottom-20 fs6 fw-300 color-white background-logo'>
              GAS
            </h2>

            <div className='w-100'>
              <FromGroup title='Recuperar Senha' hideIcon>
                <div className='p-15 background-white'>
                  <Input
                    value={this.state.data.password}
                    label='Digite sua senha'
                    name='password'
                    type='password'
                    onChange={this.onChangeHandler}
                    placeholder='Digite sua nova senha'
                  />
                  <Input
                    value={this.state.data.repassword}
                    label='Confirme sua nova senha'
                    name='repassword'
                    type='password'
                    onChange={this.onChangeHandler}
                    placeholder='Confirme sua nova senha'
                  />
                  <div className='d-flex d-flex-space-between d-flex-align-center'>
                    <Button
                      loading={this.state.isSubmiting ? 1 : 0}
                      disabled={hasValidForm}
                      type='primary'
                      onClick={this.onSubmitHandler}
                    >
                      Salvar Nova Senha
                    </Button>
                  </div>
                </div>
              </FromGroup>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
}

export default connect()(ResetPassword);
