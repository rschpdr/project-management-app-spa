import React, { Component } from "react";
import axios from "axios";

// Importando botāo de loading
import LoadingButton from "../../components/LoadingButton";

class ProjectForm extends Component {
  state = {
    title: "",
    description: "",
    loading: false,
    error: "",
  };

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  // Dispara a requisiçāo HTTP para o backend com os dados do formulário
  handleSubmit = async (event) => {
    this.setState({ loading: true });

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await axios.post(
        "http://localhost:4000/api/project",
        this.state
      );
      console.log(response);

      // Cancela o estado de loading
      this.setState({ loading: false });

      // Navega programaticamente para a lista de projetos
      this.props.history.push("/project/all");
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  };

  render() {
    return (
      <div>
        <h1>New Project</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="titleProjectInput">Title</label>
            <input
              type="text"
              className="form-control"
              id="titleProjectInput"
              name="title"
              // Tornando input controlado
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionProjectInput">Description</label>
            <textarea
              className="form-control"
              id="descriptionProjectInput"
              name="description"
              // Tornando input controlado
              onChange={this.handleChange}
              value={this.state.description}
            ></textarea>
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
          {this.state.error ? (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default ProjectForm;
