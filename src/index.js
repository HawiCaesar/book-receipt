import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.output.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";
import { books, alert } from "./stores";
import { Provider } from "mobx-react";
import { Alert } from "./components";

const store = {
  books,
  alert,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
      <Alert />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
