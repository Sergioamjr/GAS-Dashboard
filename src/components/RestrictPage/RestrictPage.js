//@flow
import * as React from "react";
import { getAuth } from "../../services/localStorage";
import type { BrowserHistory } from "history";

/*
Improvement:
Only render the child component if has permission
*/

type Props = {
  component: React.ElementType,
  history: BrowserHistory
};

type State = {};

class RestrictPage extends React.Component<Props, State> {
  componentDidMount = () => {
    // this.hasAuth();
  };

  hasAuth = async () => {
    try {
      const { username } = await getAuth();
      if (!username) {
        throw new Error();
      }
    } catch (error) {
      this.redirectToLogin();
    }
  };

  redirectToLogin = () => {
    this.props.history.push("/");
  };

  render() {
    const { component: Component, ...otherProps } = this.props;
    return <Component {...otherProps} />;
  }
}

export default RestrictPage;
