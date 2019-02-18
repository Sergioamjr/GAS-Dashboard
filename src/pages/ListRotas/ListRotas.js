import React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import DatePicker from '../../components/DatePicker/DatePicker';
import {
  getRotas,
  createRota,
  deleteRota
} from '../../services/data-de-entrega';
import { updateMessage } from '../../redux/store/Feedback/feedback';

const defaultData = {
  rota: ''
};

const stateDefault = {
  results: [],
  isFetching: false,
  isLoading: false,
  data: defaultData
};

class ListRotas extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    this.fetchActionsDays();
  };

  fetchActionsDays = () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        try {
          const { rotas } = await getRotas();
          this.setState({
            isFetching: false,
            results: rotas
          });
        } catch (error) {}
      }
    );
  };

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  onDeleteHandler = async _id => {
    try {
      await deleteRota({ _id });
      this.props.dispatch(updateMessage('Rota excluida com sucesso.'));
      this.fetchActionsDays();
    } catch (error) {}
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      async () => {
        try {
          await createRota({ ...this.state.data });
          this.props.dispatch(updateMessage('Rota criada com sucesso.'));
          this.setState(
            { isLoading: false, data: defaultData },
            this.fetchActionsDays
          );
        } catch (error) {
          this.setState({
            isLoading: false,
            data: defaultData
          });
        }
      }
    );
  };

  render() {
    const { results, isFetching } = this.state;
    return (
      <PageWrapper title='Lista de Entregas'>
        {isFetching && (
          <div className='p-center'>
            <i className='fas fa-spinner fs-4 color-primary rotate' />
          </div>
        )}
        <div className='m-bottom-15_'>
          <FromGroup title='Cadastrar Nova Entrega'>
            <div className='p-15 p-bottom-0'>
              <div className='grid'>
                <div className='sm-10-12'>
                  <Input
                    label='Rota:'
                    name='rota'
                    onChange={this.onChangeHandler}
                    value={this.state.data.rota}
                    placeholder='Digite a nova rota'
                  />
                </div>
                <div className='sm-2-12'>
                  <div className='d-flex d-flex-align-center h-100 m-bottom-20'>
                    <Button
                      disabled={!this.state.data.rota}
                      onClick={this.onSubmitHandler}
                      className='w-100'
                      type='primary'
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FromGroup>
          {/* <Button type="primary">Salvar</Button> */}
        </div>
        {!isFetching && results.length > 0 && (
          <div>
            <div className='table-wrapper m-bottom-20'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th className='fs-7' />
                    <th className='fs-7'>Rota</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const { _id, rota } = result;
                    return (
                      <tr key={_id}>
                        <td className='fs-7'>
                          <Button
                            onClick={() => this.onDeleteHandler(_id)}
                            className='m-left-10'
                            icon
                            type='danger'
                          >
                            Excluir
                          </Button>
                        </td>
                        <td className='fs-7'>{rota}</td>
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

export default ListRotas;
