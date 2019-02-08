import React from "react";
import FromGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";
import moment from "moment";
import { NavLink } from "react-router-dom";

const users = [
  {
    _id: "5bf49bc89822bd00049bdfec",
    nome: "Sérgio Junior",
    email: "sergioamjr91@gmail.com",
    nascimento: "10/07/1991",
    nomeDeEmergencia: "Natália",
    numeroDeEmergencia: "(11) 97712-9617",
    telefone: "(11) 9492-74392",
    cidade: "São Paulo"
  },
  {
    _id: "5bf49bc89822bd00049bdfes",
    nome: "Sérgio Junior",
    email: "sergioamjr91@gmail.com",
    nascimento: "10/07/1991",
    nomeDeEmergencia: "Natália",
    numeroDeEmergencia: "(11) 97712-9617",
    telefone: "(11) 9492-74392",
    cidade: "São Paulo"
  },
  {
    _id: "5bf49bc89822bd00049bdfeg",
    nome: "Sérgio Junior",
    email: "sergioamjr91@gmail.com",
    nascimento: "10/07/1991",
    nomeDeEmergencia: "Natália",
    numeroDeEmergencia: "(11) 97712-9617",
    telefone: "(11) 9492-74392",
    cidade: "São Paulo"
  }
];

const stateDefault = {
  results: users,
  isFetching: false
};

class ListUses extends React.Component {
  state = {
    ...stateDefault
  };

  render() {
    const { results, isFetching } = this.state;
    return (
      <PageWrapper title="Lista de Usuários">
        {isFetching && (
          <div className="p-center">
            <i className="fas fa-spinner fs-4 color-primary rotate" />
          </div>
        )}
        {!isFetching && results.length > 0 && (
          <div>
            <div className="table-wrapper m-bottom-20">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="fs-7" />
                    <th className="fs-7">Origem</th>
                    <th className="fs-7">Status</th>
                    <th className="fs-7">Data da Coleta</th>
                    <th className="fs-7">Material</th>
                    <th className="fs-7">Quantidade (KG)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const {
                      _id,
                      nome,
                      pickup_date,
                      cidade,
                      telefone,
                      email
                    } = result;

                    return (
                      <tr>
                        <td className="fs-7">
                          <NavLink to={`usuario/${_id}`}>
                            <Button icon type="primary">
                              <i className="fas fa-eye" />
                            </Button>
                          </NavLink>
                        </td>
                        <td className="fs-7">{nome}</td>
                        <td className="fs-7">{email}</td>
                        <td className="fs-7">
                          {moment(pickup_date).format("DD/MM/YYYY")}
                        </td>
                        <td className="fs-7">{cidade}</td>
                        <td className="fs-7">{telefone}</td>
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
