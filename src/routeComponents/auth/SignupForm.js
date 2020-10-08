import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/";

// Importando botāo de loading
import LoadingButton from "../../components/LoadingButton";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

class SignupForm extends Component {
  state = { name: "", email: "", password: "", loading: false, error: "" };

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Dispara a requisiçāo HTTP para o backend com os dados do formulário
  handleSubmit = async (event) => {
    this.setState({ loading: true });

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await api.post("/signup", this.state);
      console.log(response);

      // Cancela o estado de loading
      this.setState({ loading: false });

      // Navega programaticamente para a lista de projetos
      this.props.history.push("/login");
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="signupNameInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="signupNameInput"
              name="name"
              // Tornando input controlado
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupEmailInput">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="signupEmailInput"
              name="email"
              // Tornando input controlado
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPasswordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="signupPasswordInput"
              name="password"
              // Tornando input controlado
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          {/* Renderizaçāo condicional do botāo de loading */}
          {this.state.loading ? (
            <LoadingButton />
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
          {/* Renderizaçāo condicional do alerta de erro */}
          {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
          <p className="mt-3">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignupForm;
