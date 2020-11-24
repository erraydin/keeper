import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NotesPage from "./components/NotesPage";
import TrashPage from "./components/TrashPage";
import NotFoundPage from "./components/NotFoundPage";




function App() {
  const routes = (
    <Switch>
      <Route path="/" exact component={NotesPage} />
      <Route path="/trash" exact component={TrashPage} />
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



export default App;
