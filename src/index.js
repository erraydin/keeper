import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { saveState } from "./utils/localStorage";

const store = configureStore();

//Whenever state changes, this saves it to local storage
//probably not efficient to always store in real life
store.subscribe(() => {
  saveState(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
