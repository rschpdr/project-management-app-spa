import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import SignupForm from "../routeComponents/auth/SignupForm";
import Login from "../routeComponents/auth/Login";
import Profile from "../routeComponents/auth/Profile";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import ProjectCreate from "../routeComponents/projects/ProjectCreate";
import ProjectList from "../routeComponents/projects/ProjectList";
import ProjectDetail from "../routeComponents/projects/ProjectDetail";
import ProjectEdit from "../routeComponents/projects/ProjectEdit";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedUser = JSON.parse(storedUser || '""');

    setLoggedInUser({ ...parsedUser.user });
  }, []);

  return (
    <div className="container mt-5">
      <BrowserRouter forceRefresh={true}>
        {loggedInUser._id ? (
          <Switch>
            <PrivateRoute
              path="/profile"
              component={Profile}
              user={loggedInUser}
            />
            <Route exact path="/project/all" component={ProjectList} />
            <Route>
              <Redirect to="/profile" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" component={SignupForm} />
            <Route
              path="/login"
              render={(props) => {
                return <Login setLoggedInUser={setLoggedInUser} {...props} />;
              }}
            />
            <Route exact path="/project/all" component={ProjectList} />
            <Route exact path="/project/new" component={ProjectCreate} />
            <Route path="/project/edit/:id" component={ProjectEdit} />
            <Route path="/project/:id" component={ProjectDetail} />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
