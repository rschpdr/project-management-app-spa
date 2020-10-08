import React, { Component } from "react";
import api from "../../apis/";

import ProjectForm from "./ProjectForm";

import LoadingSpinner from "../../components/LoadingSpinner";

class ProjectEdit extends Component {
  state = {
    title: "",
    description: "",
    error: "",
    isLoadingFetch: false,
    isLoadingSend: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({ isLoadingFetch: true });

    try {
      const response = await api.get(`/project/${id}`);

      console.log(response);
      this.setState({ ...response.data, isLoadingFetch: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, isLoadingFetch: false });
    }
  }

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Dispara a requisiçāo HTTP para o backend com os dados do formulário
  handleSubmit = async (event) => {
    this.setState({ isLoadingSend: true });

    const { id } = this.props.match.params;

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await api.patch(`/project/${id}`, this.state);
      console.log(response);

      // Cancela o estado de loading
      this.setState({ isLoadingSend: false });

      // Navega programaticamente para a lista de projetos
      this.props.history.push("/project/all");
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, isLoadingSend: false });
    }
  };

  // 1. Popular o formulario com os dados existentes

  // 2. Enviar os dados atualizados para o servidor

  render() {
    return (
      <div>
        <h1>Edit Project</h1>
        {this.state.isLoadingFetch ? (
          <LoadingSpinner />
        ) : (
          <ProjectForm
            state={{ ...this.state, loading: this.state.isLoadingSend }}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default ProjectEdit;
