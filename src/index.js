import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App, { history } from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { login, logout, setLoggingIn } from "./actions/auth";
import Loading from "./components/Loading";
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
ReactDOM.render(<Loading />, document.getElementById("root"));

//Fetch notes from database if authenticated, set redux state, and render app
//If not authenticated, just render app and send to login page
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    const route = "/users/" + user.uid;
    // console.log(route);
    firebase
      .database()
      .ref(route)
      .once("value")
      .then((response) => {
        const state = createState(response.val());
        store.dispatch(setMainState(state));
        renderApp();
        if (history.location.pathname === "/") {
          history.push("/notes");
        }
        store.dispatch(setLoggingIn(false));
      });
  } else {
    // console.log("log out");
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
