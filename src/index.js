import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App, { history } from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
// import { saveState } from "./utils/localStorage";
import axios from "./axios-notes";
import { createState } from "./utils/firebaseToState";
import { firebase } from "./firebase/firebase";
import { setMainState } from "./actions/actions";

//Init Store
const store = configureStore();

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    hasRendered = true;
  }
};

//Initial loading page
ReactDOM.render(<p>Loading...</p>, document.getElementById("root"));

//Fetch notes from database if authenticated, set redux state, and render app
//If not authenticated, just render app and send to login page
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    axios.get("/state.json").then((response) => {
      const state = createState(response.data);
      store.dispatch(setMainState(state));
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/notes");
      }
    });
    //Whenever state changes, this saves it to firebase (or local storage)
    store.subscribe(() => {
      // const state = store.getState();
      // saveState(state);
      axios.put("/state.json", store.getState().main);
    });
  } else {
    // console.log("log out");
    renderApp();
    history.push("/");
  }
});
