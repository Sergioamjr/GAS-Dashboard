import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import { NavLink } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/data-de-entrega';
import { updateMessage } from '../../redux/store/Feedback/feedback';

const stateDefault = {
  results: [],
  isFetching: false
};

class ListUses extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        try {
          const { users } = await getUsers();
          this.setState({
            isFetching: false,
            results: users
          });
        } catch (error) {}
      }
    );
  };

  onDeleteHandler = async _id => {
    try {
      await deleteUser({ _id });
      this.props.dispatch(updateMessage('Usuário excluído com sucesso.'));
      this.fetchUsers();
    } catch (error) {}
  };

  render() {
    const { results, isFetching } = this.state;
    return (
      <PageWrapper title='Lista de Usuários'>
        {isFetching && (
          <div className='p-center'>
            <i className='fas fa-spinner fs-4 color-primary rotate' />
          </div>
        )}
        {!isFetching && results.length > 0 && (
          <div>
            <div className='table-wrapper m-bottom-20'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th className='fs-7' />
                    <th className='fs-7'>Nome</th>
                    <th className='fs-7'>E-mail</th>
                    <th className='fs-7'>Telefone</th>
                    <th className='fs-7'>Cidade</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const { _id, nome, cidade, telefone, email } = result;

                    return (
                      <tr key={_id}>
                        <td className='fs-7'>
                          <NavLink className='m-right-10' to={`usuario/${_id}`}>
                            <Button icon type='primary'>
                              <i className='fas fa-eye' />
                            </Button>
                          </NavLink>

                          {/* <Button
                            onClick={() => this.onDeleteHandler(_id)}
                            icon
                            type='danger'
                          >
                            <i className='fas fa-trash' />
                          </Button> */}
                        </td>
                        <td className='fs-7'>{nome}</td>
                        <td className='fs-7'>{email}</td>
                        <td className='fs-7'>{telefone}</td>
                        <td className='fs-7'>{cidade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </PageWrapper>
    );
  }
}

export default ListUses;
