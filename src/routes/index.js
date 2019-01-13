import React, { Component } from "react";
import AppRouter from "./routes";
import { connect } from "react-redux";
import { UpdateUser } from "../redux/store/User/User";
import { getAuth } from "../services/localStorage";

class App extends Component {
  componentDidMount = () => {
    this.fetchUser();
  };

  fetchUser = async () => {
    try {
      const user = await getAuth();
      this.props.dispatch(UpdateUser(user));
    } catch (error) {}
  };

  render() {
    return <AppRouter {...this.props} />;
  }
}

export default connect()(App);
