import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/style.css";

import PrivateRoute from "../routeComponents/auth/PrivateRoute";
import ProjectCreate from "../routeComponents/projects/ProjectCreate";
import ProjectList from "../routeComponents/projects/ProjectList";
import ProjectDetail from "../routeComponents/projects/ProjectDetail";
import ProjectEdit from "../routeComponents/projects/ProjectEdit";
import ProjectDelete from "../routeComponents/projects/ProjectDelete";
import TaskCreate from "../routeComponents/tasks/TaskCreate";
import TaskEdit from "../routeComponents/tasks/TaskEdit";
import TaskDetail from "../routeComponents/tasks/TaskDetail";
import TaskDelete from "../routeComponents/tasks/TaskDelete";
import SignupForm from "../routeComponents/auth/SignupForm";
import LoginForm from "../routeComponents/auth/LoginForm";

class App extends Component {
  state = {
    user: {},
    token: "",
  };

  // componentDidMount() {
  //   const loggedInUser = localStorage.getItem("loggedInUser");

  //   const storedUser = JSON.parse(loggedInUser || '""');

  //   if (storedUser) {
  //     this.setState({ ...storedUser, user: { ...storedUser.user } });
  //   }
  // }

  componentDidUpdate() {
    console.log("After token update =>", this.state);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ user: { ...this.state.user }, token: this.state.token })
    );
  }

  handleLogin = ({ user, token }) => {
    this.setState({ token, user: { ...user } });
  };

  render() {
    return (
      <div className="container mt-5">
        <BrowserRouter>
          <Switch>
            <Route exact path="/project/new" component={ProjectCreate} />
            <PrivateRoute
              exact
              path="/project/all"
              user={this.state.user}
              component={ProjectList}
            />
            <Route exact path="/project/edit/:id" component={ProjectEdit} />
            <Route exact path="/project/:id" component={ProjectDetail} />
            <Route exact path="/project/delete/:id" component={ProjectDelete} />
            <Route exact path="/task/new/:projectId" component={TaskCreate} />
            <Route exact path="/task/edit/:id" component={TaskEdit} />
            <Route exact path="/task/:id" component={TaskDetail} />
            <Route exact path="/task/delete/:id" component={TaskDelete} />

            <Route exact path="/signup" component={SignupForm} />
            <Route
              exact
              path="/login"
              render={() => {
                return (
                  <LoginForm
                    userState={this.state}
                    setUserState={this.handleLogin}
                  />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
