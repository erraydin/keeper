import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
// import { saveState } from "./utils/localStorage";
import axios from "./axios-notes";
import { initNotes } from "./utils/firebaseToState";

//Init Store
const store = configureStore();

//Fetch notes from firebase
initNotes(store);

//Whenever state changes, this saves it to firebase (or local storage)
store.subscribe(() => {
  // const state = store.getState();
  // saveState(state);
  axios.put("/state.json", store.getState().main);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
