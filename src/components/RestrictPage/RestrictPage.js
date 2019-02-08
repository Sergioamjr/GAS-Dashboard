//@flow
import * as React from "react";
import { getAuth } from "../../services/localStorage";
import type { BrowserHistory } from "history";
import { hasValidToken } from "../../services/user";

/*
Improvement:
Only render the child component if has permission
*/

type Props = {
  component: React.ElementType,
  history: BrowserHistory
};

type State = {
  query: boolean,
  isValid: boolean
};

class RestrictPage extends React.Component<Props, State> {
  state = {
    query: false,
    isValid: false
  };
  componentDidMount = () => {
    this.hasAuth();
  };

  hasAuth = () => {
    this.setState(
      {
        query: true,
        isValid: false
      },
      async () => {
        try {
          const { token } = await getAuth();
          const { isValid } = await hasValidToken({ token });
          if (!isValid) {
            this.redirectToLogin();
            return false;
          }
          this.setState({ query: false, isValid: true });
        } catch (error) {
          this.redirectToLogin();
        }
      }
    );
  };

  redirectToLogin = () => {
    this.props.history.push("/");
  };

  render() {
    const { query, isValid } = this.state;
    const { component: Component, ...otherProps } = this.props;
    if (!query && isValid) {
      return <Component {...otherProps} />;
    }
    return null;
  }
}

export default RestrictPage;
