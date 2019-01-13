import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
import DefaultStore from "./store/storeDefault.js";
import { customMiddleware } from "./middlewares/index";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
  Reducers,
  DefaultStore,
  reduxDevTools(applyMiddleware(thunk, customMiddleware))
);

export default Store;
