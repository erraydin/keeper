import "./App.css";
import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// import Header from "./components/Header";
// import SideBar from "./components/SideBar";
import NotesPage from "./components/NotesPage";
import TrashPage from "./components/TrashPage";
import ArchivePage from "./components/ArchivePage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import { connect } from "react-redux";
import EditLabels from "./components/EditLabels";
import Backdrop from "./components/Backdrop";
import Loading from "./components/Loading";

export const history = createHistory();

function App(props) {
  const [editingLabels, setEditingLabels] = useState(false);

  function openEditLabels() {
    setEditingLabels(true);
  }

  function closeEditLabels() {
    setEditingLabels(false);
  }

  const routes = (
    <Switch>
      <Route path="/" exact render={(props) => <LoginPage />} />
      <Route
        path="/notes"
        exact
        render={(props) => (
          <NotesPage {...props} openEditLabels={openEditLabels} />
        )}
      />
      <Route
        path="/archive"
        exact
        render={(props) => (
          <ArchivePage {...props} openEditLabels={openEditLabels} />
        )}
      />
      <Route
        path="/trash"
        exact
        render={(props) => (
          <TrashPage {...props} openEditLabels={openEditLabels} />
        )}
      />

      {props.labels.map((label) => {
        return (
          <Route
            key={label}
            path={"/label/" + label}
            exact
            render={(props) => (
              <NotesPage {...props} openEditLabels={openEditLabels} />
            )}
          />
        );
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
  return (
    <Router history={history}>
      {props.loggingIn ? (
        <Loading />
      ) : (
        <React.Fragment>
          {editingLabels ? (
            <EditLabels closeEditLabels={closeEditLabels} />
          ) : null}
          <Backdrop
            show={editingLabels}
            onClick={closeEditLabels}
            transparent={false}
          />
          {routes}
        </React.Fragment>
      )}
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
    loggingIn: state.auth.loggingIn,
  };
};

export default connect(mapStateToProps)(App);
