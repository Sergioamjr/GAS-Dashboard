import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";
import moment from "moment";
import { NavLink } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";

const users = [
  {
    _id: "5c2ffca8602c74000493fb8a",
    data: "2019-01-11T02:00:00.000Z",
    senha: "12345",
    __v: 0
  },
  {
    _id: "5c3b9ed67288d100048539a0",
    data: "2019-02-08T02:00:00.000Z",
    senha: "123123",
    __v: 0
  }
];

const stateDefault = {
  results: users,
  isFetching: false,
  data: {
    data_da_entrega: new Date(),
    token: ""
  }
};

class ListActions extends React.Component {
  state = {
    ...stateDefault
  };

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  render() {
    const { results, isFetching } = this.state;
    return (
      <PageWrapper title="Lista de Entregas">
        {isFetching && (
          <div className="p-center">
            <i className="fas fa-spinner fs-4 color-primary rotate" />
          </div>
        )}
        <div className="m-bottom-15_">
          <FromGroup title="Cadastrar Nova Entrega">
            <div className="p-15 p-bottom-0">
              <div className="grid">
                <div className="sm-5-12">
                  <DatePicker
                    label="Data da Entrega"
                    name="data_da_entrega"
                    onChange={e => {
                      this.onChangeHandler({
                        target: {
                          name: "data_da_entrega",
                          value: moment(e)
                            .utc()
                            .format()
                        }
                      });
                    }}
                    value={new Date(this.state.data.data_da_entrega)}
                  />
                </div>
                <div className="sm-5-12">
                  <Input
                    label="Senha:"
                    name="token"
                    onChange={this.onChangeHandler}
                    value={this.state.data.token}
                    placeholder="Digite a senha da entrega"
                  />
                </div>
                <div className="sm-2-12">
                  <div className="d-flex d-flex-align-center h-100 m-bottom-20">
                    <Button className="w-100" type="primary">
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
            <div className="table-wrapper m-bottom-20">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="fs-7" />
                    <th className="fs-7">Senha</th>
                    <th className="fs-7">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const { _id, senha, data } = result;
                    return (
                      <tr key={_id}>
                        <td className="fs-7">
                          {false && (
                            <Button icon type="primary">
                              Salvar
                            </Button>
                          )}
                          <Button className="m-left-10" icon>
                            Editar
                          </Button>
                          <Button className="m-left-10" icon type="danger">
                            Excluir
                          </Button>
                        </td>
                        <td className="fs-7">{senha}</td>
                        <td className="fs-7">
                          {moment(data).format("DD/MM/YYYY")}
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
