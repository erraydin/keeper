import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NotesPage from "./components/NotesPage";
import TrashPage from "./components/TrashPage";
import EditLabelsPage from "./components/EditLabelsPage";
import NotFoundPage from "./components/NotFoundPage";


const routes = (
  <Switch>
    <Route path="/" exact component={NotesPage} />
    <Route path="/trash" component={TrashPage} />
    <Route path="/edit-labels" component={EditLabelsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      {routes}
    </BrowserRouter>
  );
}

export default App;
