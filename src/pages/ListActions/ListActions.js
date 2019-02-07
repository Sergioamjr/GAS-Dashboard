import React from 'react';
import FromGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import DatePicker from '../../components/DatePicker/DatePicker';
import {
  addNewDate,
  getDates,
  deleteDate
} from '../../services/data-de-entrega';

const defaultData = {
  data: new Date(),
  senha: ''
};

const stateDefault = {
  results: [],
  isFetching: false,
  isLoading: false,
  data: defaultData
};

class ListActions extends React.Component {
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
          const { datas } = await getDates();
          this.setState({
            isFetching: false,
            results: datas
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
      await deleteDate({ _id });
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
          await addNewDate({ ...this.state.data });
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
    const datesToDisabled = results.map(({ data }) => new Date(data));
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
                <div className='sm-5-12'>
                  <DatePicker
                    label='Data da Entrega'
                    minDate={new Date()}
                    name='data'
                    excludeDates={datesToDisabled}
                    onChange={e => {
                      this.onChangeHandler({
                        target: {
                          name: 'data',
                          value: moment(e)
                            .utc()
                            .format()
                        }
                      });
                    }}
                    value={new Date(this.state.data.data)}
                  />
                </div>
                <div className='sm-5-12'>
                  <Input
                    label='Senha:'
                    name='senha'
                    onChange={this.onChangeHandler}
                    value={this.state.data.senha}
                    placeholder='Digite a senha da entrega'
                  />
                </div>
                <div className='sm-2-12'>
                  <div className='d-flex d-flex-align-center h-100 m-bottom-20'>
                    <Button
                      disabled={!this.state.data.senha}
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
                    <th className='fs-7'>Senha</th>
                    <th className='fs-7'>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const { _id, senha, data } = result;
                    return (
                      <tr key={_id}>
                        <td className='fs-7'>
                          {false && (
                            <Button icon type='primary'>
                              Salvar
                            </Button>
                          )}
                          <Button className='m-left-10' icon>
                            Editar
                          </Button>
                          <Button
                            onClick={() => this.onDeleteHandler(_id)}
                            className='m-left-10'
                            icon
                            type='danger'
                          >
                            Excluir
                          </Button>
                        </td>
                        <td className='fs-7'>{senha}</td>
                        <td className='fs-7'>
                          {moment(data).format('DD/MM/YYYY')}
                        </td>
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

export default ListActions;
