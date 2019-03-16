import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { getActions, getVoluntariesByActions } from '../../services/user';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';

const stateDefault = {
  isFetching: true,
  fetchingUsers: false,
  users: [],
  actions: [],
  actionSelected: ''
};

class QueryAction extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = async () => {
    try {
      const { actions } = await getActions();
      this.setState({
        actions,
        isFetching: false
      });
    } catch (error) {}
  };

  onChangeHandler = event => {
    const {
      target: { value }
    } = event;
    this.setState(
      {
        actionSelected: value,
        fetchingUsers: true
      },
      this.onQueryVoluntaries
    );
  };

  onQueryVoluntaries = async () => {
    try {
      const { users } = await getVoluntariesByActions(
        this.state.actionSelected
      );
      this.setState({
        users,
        fetchingUsers: false
      });
    } catch (error) {}
  };

  render() {
    return (
      <PageWrapper title='Consultar Voluntários'>
        <div>
          {this.state.actions.length > 0 && (
            <div className='m-bottom-30'>
              <label className='label d-block'>Selecione a entrega</label>
              <select
                value={this.state.actionSelected}
                onChange={this.onChangeHandler}
                disabled={this.state.fetchingUsers}
              >
                <option />
                {this.state.actions.map((action, index) => {
                  return (
                    <option key={index} value={action}>
                      {moment(action).format('DD/MM/YYYY')}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {!this.state.fetchingUsers && this.state.users.length > 0 && (
            <div>
              <div className='table-wrapper m-bottom-20'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th className='fs-7' />
                      <th className='fs-7'>Nome</th>
                      <th className='fs-7'>Data</th>
                      <th className='fs-7'>Modelo do Carro</th>
                      <th className='fs-7'>Pela Primeira Vez?</th>
                      <th className='fs-7'>Telefone</th>
                      <th className='fs-7'>É Lider?</th>
                      <th className='fs-7'>Rota Definida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map(user => {
                      const {
                        _id,
                        nome,
                        withCar,
                        first_time,
                        carModel,
                        action_date,
                        user_id,
                        details
                      } = user;

                      return (
                        <tr key={_id}>
                          <td className='fs-7'>
                            <NavLink
                              className='m-right-10'
                              to={`usuario/${user_id}`}
                            >
                              <Button icon type='primary'>
                                <i className='fas fa-eye' />
                              </Button>
                            </NavLink>
                          </td>
                          <td className='fs-7'>
                            {moment(action_date).format('DD/MM/YYYY')}
                          </td>
                          <td className='fs-7'>{nome}</td>
                          <td className='fs-7'>{withCar ? carModel : ''}</td>
                          <td className='fs-7'>{first_time ? 'Sim' : ''}</td>
                          <td className='fs-7'>{details.telefone}</td>
                          <td className='fs-7'>{details.lider ? 'Sim' : ''}</td>
                          <td className='fs-7'>{details.rotaDefault}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  }
}

export default QueryAction;
