import React from "react";
import PageWrapper from "../../components/PageWrapper";
import Button from "../../components/Button";
import { getList } from "../../services/requisicoes";
import { NavLink } from "react-router-dom";
import moment from "moment";
import _get from "lodash/get";
import {
  decideStatusRequestFilter,
  decideRedirectUrl,
  decideSubtitleByUrl,
  decineToolTip
} from "../../utils/decideRedirectUrl";

const stateDefault = {
  isFetching: false,
  results: [],
  hasError: false
};

class ClientsPage extends React.Component {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    this.fetchRequestList();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.match !== this.props.match) {
      this.fetchRequestList();
    }
  };

  fetchRequestList = () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        try {
          const search = _get(this.props, "match.params.status");
          const { requisicoes = [] } = await getList();
          const filterBy = decideStatusRequestFilter(search);
          this.setState({
            isFetching: false,
            results:
              search && filterBy
                ? requisicoes.filter(({ status }) => filterBy.includes(status))
                : requisicoes
          });
        } catch (error) {
          this.setState({
            isFetching: false,
            hasError: true
          });
        }
      }
    );
  };

  render() {
    const { results, isFetching } = this.state;
    const search = _get(this.props, "match.params.status");
    const subtitle = decideSubtitleByUrl(search);
    return (
      <PageWrapper title="Lista de Requisições" subtitle={subtitle && subtitle}>
        {isFetching && (
          <div className="p-center">
            <i className="fas fa-spinner fs-4 color-primary rotate" />
          </div>
        )}
        {!isFetching && results.length === 0 && (
          <p className="p-center">Nenhuma requisição encontrada.</p>
        )}
        {!isFetching && results.length > 0 && (
          <div>
            <div className="table-wrapper m-bottom-20">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="fs-7" />
                    <th className="fs-7">ID</th>
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
                      rowid,
                      origem,
                      pickup_date,
                      material,
                      quantidade,
                      status
                    } = result;
                    const linkToRedirect = decideRedirectUrl(status);
                    const tooltip = decineToolTip(status);
                    return (
                      <tr key={index}>
                        <td className="fs-7">
                          {linkToRedirect && (
                            <NavLink
                              className="m-right-10"
                              to={`${linkToRedirect}/${rowid}`}
                            >
                              <Button
                                data-tooltip={tooltip}
                                className="tooltip"
                                icon
                                type="primary"
                              >
                                <i className="fas fa-arrow-right" />
                              </Button>
                            </NavLink>
                          )}
                          <NavLink
                            className="m-right-10"
                            to={`/consultar-req/${rowid}`}
                          >
                            <Button
                              icon
                              data-tooltip="Visualizar Requisição"
                              className="tooltip"
                              type={linkToRedirect ? "primary" : "success"}
                            >
                              <i
                                className={`fas ${
                                  linkToRedirect ? "fa-eye" : " fa-check-circle"
                                } color-white`}
                              />
                            </Button>
                          </NavLink>
                          {status === "Nova" && (
                            <NavLink to={`/editar/${rowid}`}>
                              <Button
                                data-tooltip="Editar Requisição"
                                className="tooltip"
                                icon
                                type="primary"
                              >
                                <i className="far fa-edit" />
                              </Button>
                            </NavLink>
                          )}
                        </td>
                        <td className="fs-7">{rowid}</td>
                        <td className="fs-7">{origem}</td>
                        <td className="fs-7">{status}</td>
                        <td className="fs-7">
                          {moment(pickup_date).format("DD/MM/YYYY")}
                        </td>
                        <td className="fs-7">{material}</td>
                        <td className="fs-7">{quantidade}</td>
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

export default ClientsPage;
