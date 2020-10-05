import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import ProjectForm from "../routeComponents/projects/ProjectForm";
import ProjectList from "../routeComponents/projects/ProjectList";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Route path="/project/new" component={ProjectForm} />
        <Route path="/project/all" component={ProjectList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
