import "./App.css";
import React, {useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NotesPage from "./components/NotesPage";
import TrashPage from "./components/TrashPage";
import NotFoundPage from "./components/NotFoundPage";
import { connect } from "react-redux";
import EditLabels from "./components/EditLabels";
import Backdrop from "./components/Backdrop";




function App(props) {
  const [editingLabels, setEditingLabels]= useState(false);
  
  function openEditLabels () {
    setEditingLabels(true);
  }

  function closeEditLabels () {
    setEditingLabels(false);
  }

  const routes = (
    <Switch>
      <Route path="/" exact component={NotesPage} />
      <Route path="/trash" exact component={TrashPage} />
      {props.labels.map(label => {
        return <Route key={label.id} path={"/label/"+label.labelName} exact component={NotesPage} />
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
  return (
    <BrowserRouter>
      <Header />
      <SideBar openEditLabels={openEditLabels}/>
      {editingLabels ? <EditLabels closeEditLabels={closeEditLabels}/> : null}
      <Backdrop show={editingLabels} onClick={closeEditLabels} transparent={false}/>
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
