import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.output.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";
import { BookStoreAPI } from "./api/BookStoreAPI";
import { Provider } from "mobx-react";

const store = new BookStoreAPI();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
