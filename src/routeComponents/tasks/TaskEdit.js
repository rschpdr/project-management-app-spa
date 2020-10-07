import React, { Component } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";

class TaskEdit extends Component {
  // 1. Criar o state do formulario

  state = {
    title: "",
    description: "",
    status: "",
    error: "",
    isLoadingFetch: false,
    isLoadingSend: false,
  };

  // 2. Pegar os dados existentes

  async componentDidMount() {
    this.setState({ isLoadingFetch: true });
    try {
      const { id } = this.props.match.params;

      // Buscar os dados no banco
      const response = await axios.get(`http://localhost:4000/api/task/${id}`);

      // Atualizar o state com o que buscamos no banco
      this.setState({ ...response.data, isLoadingFetch: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, isLoadingFetch: false });
    }
  }

  // 3. Atualizar os dados existentes

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = async (event) => {
    this.setState({ isLoadingSend: true });

    const { id } = this.props.match.params;

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // 4. Disparar requisicao pro backend
      // Disparar a requisiçāo manualmente através do React
      const response = await axios.patch(
        `http://localhost:4000/api/task/${id}`,
        this.state
      );
      console.log(response);

      // Cancela o estado de loading
      this.setState({ isLoadingSend: false });

      // Navega programaticamente para a lista de projetos
      this.props.history.goBack();
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, isLoadingSend: false });
    }
  };

  render() {
    return (
      <div>
        <h1>Edit Task</h1>
        <TaskForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default TaskEdit;
