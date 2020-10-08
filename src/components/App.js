import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/style.css";

import Navbar from "./Navbar";
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
import Logout from "../routeComponents/auth/Logout";

class App extends Component {
  state = {
    user: {},
    token: "",
  };

  componentDidMount() {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || '""');

    this.setState({ ...storedUser });
  }

  handleLoginSubmit = (data) => {
    console.log(data);
    this.setState({ token: data.token, user: { ...data.user } });
  };

  handleLogout = () => {
    // Limpa o state do componente para deslogar o usuario
    this.setState({
      user: {},
      token: "",
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar user={this.state.user} />
        {/* Só renderiza rotas privadas se o usuário estiver logado */}
        <div className="container mt-5">
          {this.state.user._id ? (
            <Switch>
              <PrivateRoute
                exact
                path="/logout"
                component={Logout}
                user={this.state}
                handleLogout={this.handleLogout}
              />
              <PrivateRoute
                exact
                path="/project/new"
                user={this.state}
                component={ProjectCreate}
              />
              <PrivateRoute
                exact
                path="/project/all"
                user={this.state}
                component={ProjectList}
              />
              <PrivateRoute
                exact
                path="/project/edit/:id"
                user={this.state}
                component={ProjectEdit}
              />
              <PrivateRoute
                exact
                path="/project/:id"
                user={this.state}
                component={ProjectDetail}
              />
              <PrivateRoute
                exact
                path="/project/delete/:id"
                user={this.state}
                component={ProjectDelete}
              />
              <PrivateRoute
                exact
                path="/task/new/:projectId"
                user={this.state}
                component={TaskCreate}
              />
              <PrivateRoute
                exact
                path="/task/edit/:id"
                user={this.state}
                component={TaskEdit}
              />
              <PrivateRoute
                exact
                path="/task/:id"
                user={this.state}
                component={TaskDetail}
              />
              <PrivateRoute
                exact
                path="/task/delete/:id"
                user={this.state}
                component={TaskDelete}
              />

              {/* Como as rotas publicas só sāo renderizadas quando NĀO existe um usuario logado, as rotas das mesmas nāo irāo dar match com nenhum componente. Para resolver isso, criamos uma rota sem path para dar match com todas as rotas que "sobrarem" e redirecionamos para a home */}
              <Route>
                <Redirect to="/project/all" />
              </Route>
            </Switch>
          ) : (
            // Caso contrário, renderize as rotas públicas
            <Switch>
              <Route exact path="/signup" component={SignupForm} />
              <Route
                exact
                path="/login"
                render={(props) => {
                  return (
                    <LoginForm
                      {...props}
                      setUserState={this.handleLoginSubmit}
                    />
                  );
                }}
              />
              {/* Como as rotas privadas só sāo renderizadas quando existe um usuario logado, as rotas das mesmas nāo irāo dar match com nenhum componente. Para resolver isso, criamos uma rota sem path para dar match com todas as rotas que "sobrarem" e redirecionamos para o login */}
              <Route>
                <Redirect to="/login" />
              </Route>
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
