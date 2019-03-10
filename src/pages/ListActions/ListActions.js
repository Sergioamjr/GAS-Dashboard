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
  updateEntrega,
  deleteDate
} from '../../services/data-de-entrega';
import { connect } from 'react-redux';
import { updateMessage } from '../../redux/store/Feedback/feedback';

const defaultData = {
  data: new Date(),
  senha: ''
};

const stateDefault = {
  openEdit: null,
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
        isFetching: true,
        openEdit: null
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

  onChangeEditHandler = (event, key) => {
    const {
      target: { value, name }
    } = event;
    console.log(name, value);
    let { results } = this.state;
    let resultsToEdit = results[key];
    resultsToEdit = {
      ...resultsToEdit,
      [name]: value
    };
    results[key] = resultsToEdit;
    this.setState({
      data: {
        ...this.state.data,
        results
      }
    });
  };

  onDeleteHandler = async _id => {
    try {
      await deleteDate({ _id });
      this.fetchActionsDays();
    } catch (error) {}
  };

  openEditHandler = openEdit => {
    this.setState({
      openEdit
    });
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

  onUpdateHandler = async key => {
    try {
      const results = this.state.results[key];
      await updateEntrega({
        params: { ...results, isOpen: results.isOpen === 'true' }
      });
      this.props.dispatch(updateMessage('Entrega atualizada com sucesso.'));
      this.fetchActionsDays();
    } catch (error) {}
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
                    <th className='fs-7'>Está aberta</th>
                    <th className='fs-7'>Senha</th>
                    <th className='fs-7'>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const { _id, senha, data, isOpen } = result;
                    return (
                      <tr key={_id}>
                        <td className='fs-7'>
                          {this.state.openEdit === index ? (
                            <div>
                              <Button
                                className='m-right-10'
                                icon
                                onClick={() => this.onUpdateHandler(index)}
                                type='primary'
                              >
                                Salvar
                              </Button>
                              <Button
                                onClick={() => this.openEditHandler(null)}
                                className='m-right-10'
                                icon
                              >
                                Cancelar
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Button
                                onClick={() => this.openEditHandler(index)}
                                className='m-right-10'
                                icon
                              >
                                Editar
                              </Button>
                              <Button
                                onClick={() => this.onDeleteHandler(_id)}
                                className='m-right-10'
                                icon
                                type='danger'
                              >
                                Excluir
                              </Button>
                            </div>
                          )}
                        </td>
                        <td className='fs-7'>
                          <select
                            value={isOpen}
                            name='isOpen'
                            onChange={e => this.onChangeEditHandler(e, index)}
                            disabled={this.state.openEdit !== index}
                          >
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                          </select>
                        </td>
                        <td className='fs-7'>
                          <input
                            disabled={this.state.openEdit !== index}
                            onChange={e => this.onChangeEditHandler(e, index)}
                            name='senha'
                            type='text'
                            value={senha}
                          />
                        </td>
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

export default connect()(ListActions);
