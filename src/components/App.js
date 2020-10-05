import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import ProjectCreate from "../routeComponents/projects/ProjectCreate";
import ProjectList from "../routeComponents/projects/ProjectList";
import ProjectDetail from "../routeComponents/projects/ProjectDetail";
import ProjectEdit from "../routeComponents/projects/ProjectEdit";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Switch>
          <Route exact path="/project/new" component={ProjectCreate} />
          <Route exact path="/project/all" component={ProjectList} />
          <Route path="/project/edit/:id" component={ProjectEdit} />
          <Route path="/project/:id" component={ProjectDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
