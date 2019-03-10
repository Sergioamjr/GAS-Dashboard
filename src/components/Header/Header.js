// @flow
import * as React from 'react';
import Button from '../Button/Button';
import { removeAuth } from '../../services/localStorage';
import { withRouter } from 'react-router-dom';
import type { BrowserHistory } from 'history';
import { ResetUser } from '../../redux/store/User/User';
import _get from 'lodash/get';

type Props = {
  history: BrowserHistory,
  dispatch: any,
  User: {
    username: string
  }
};

type State = {};

class Header extends React.Component<Props, State> {
  onLogoutHandler = async () => {
    try {
      this.props.dispatch(ResetUser());
      await removeAuth();
      this.props.history.push('/');
    } catch (error) {}
  };

  render() {
    const username = _get(this.props, 'User.nome', false);
    return (
      <header className='header d-flex d-flex-align-center d-flex-space-between'>
        <h1 className='color-white background-logo background-logo-small'>
          GAS - Grupo de Atitude Social
        </h1>
        <div className='d-flex d-flex-space-between d-flex-align-center'>
          {username && <p className=' color-white'>Olá, {username}</p>}
          <Button onClick={this.onLogoutHandler} className='m-left-10' small>
            Sair
          </Button>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
