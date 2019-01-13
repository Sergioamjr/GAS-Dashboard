import React, { Component } from "react";
import "./App.scss";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import Store from "./redux";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={Store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
