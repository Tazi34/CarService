import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddlewares from "redux-thunk";
import App from "./App";
import "./index.css";
import reducer from "./redux/reducer";
import * as serviceWorker from "./serviceWorker";
import {
  authenticateSuccess,
  fetchUser,
  localStorageTokenItemName
} from "./redux/authentication/authenticationActions";
import Axios from "axios";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddlewares))
);
const token = localStorage.getItem(localStorageTokenItemName);
if (token) {
  store.dispatch(authenticateSuccess());
  store.dispatch(fetchUser());
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
