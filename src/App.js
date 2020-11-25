import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NotesPage from "./components/NotesPage";
import TrashPage from "./components/TrashPage";
import NotFoundPage from "./components/NotFoundPage";
import { connect } from "react-redux";




function App(props) {
  const routes = (
    <Switch>
      <Route path="/" exact component={NotesPage} />
      <Route path="/trash" exact component={TrashPage} />
      {props.labels.map(label => {
        return <Route path={"/label/"+label} exact component={NotesPage} />
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      {routes}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
  };
};


export default connect(mapStateToProps)(App);
