import React, { Component } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";

class TaskCreate extends Component {
  // 1. Gerenciar os dados do formulario
  state = {
    title: "",
    description: "",
    status: "",
    loading: false,
    error: "",
  };

  // 2. Criar os handlers de evento para change e submit

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = async (event) => {
    // 3. Enviar a requisicao POST pro servidor
    this.setState({ loading: true });

    console.log(event);

    try {
      // Extrair id do Projeto da URL
      const { projectId } = this.props.match.params;

      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await axios.post(
        `http://localhost:4000/api/task/${projectId}`,
        this.state
      );
      console.log(response);

      // Cancela o estado de loading
      this.setState({ loading: false });

      // Navega programaticamente para a lista de projetos
      this.props.history.push(`/project/${projectId}`);
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  };

  // 4. Renderiza o form na tela

  render() {
    return (
      <div>
        <h1>New Task</h1>
        <TaskForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default TaskCreate;
