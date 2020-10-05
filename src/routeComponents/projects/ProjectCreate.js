import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Importar componente de formulario
import ProjectForm from "./ProjectForm";

class ProjectCreate extends Component {
  state = {
    title: "",
    description: "",
    loading: false,
    error: "",
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
      const response = await axios.post(
        "http://localhost:4000/api/project",
        this.state
      );
      console.log(response);

      // Cancela o estado de loading
      this.setState({ loading: false });

      // Navega programaticamente para a lista de projetos
      this.props.match.history.push("/project/all");
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  };

  render() {
    return (
      <div>
        <h1>New Project</h1>
        <ProjectForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default ProjectCreate;
