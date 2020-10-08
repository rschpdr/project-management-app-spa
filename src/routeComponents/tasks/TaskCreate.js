import React, { Component } from "react";
import api from "../../apis/";

import TaskForm from "./TaskForm";

class TaskCreate extends Component {
  // 1. Gerenciar os dados do formulario
  state = {
    title: "",
    description: "",
    status: "To Do",
    attachment: "",
    attachmentUrl: "",
    loading: false,
    error: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.attachmentUrl !== this.state.attachmentUrl) {
      if (this.state.attachmentUrl) {
        try {
          // Extrair id do Projeto da URL
          const { projectId } = this.props.match.params;

          // Disparar a requisiçāo manualmente através do React
          const response = await api.post(`/task/${projectId}`, this.state);
          console.log(response);

          // Cancela o estado de loading
          this.setState({ loading: false });

          // Navega programaticamente para a lista de projetos
          this.props.history.push(`/project/${projectId}`);
        } catch (err) {
          console.error(err);
          this.setState({ loading: false, error: err.message });
        }
      }
    }
  }

  // 2. Criar os handlers de evento para change e submit

  handleChange = (event) => {
    if (event.currentTarget.files) {
      return this.setState({
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
    }
    return this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleFileUpload = async (file) => {
    try {
      // Criando um arquivo programaticamente
      const uploadData = new FormData();

      uploadData.append("attachment", file);

      const response = await api.post("/attachment-upload", uploadData);

      console.log(response.data.attachmentUrl);

      return response.data.attachmentUrl;
    } catch (err) {
      console.error(err);
    }
  };

  handleSubmit = async (event) => {
    // 3. Enviar a requisicao POST pro servidor
    this.setState({ loading: true });

    try {
      // Extrair id do Projeto da URL
      const { projectId } = this.props.match.params;

      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      console.log(this.state);

      const fileUrl = await this.handleFileUpload(this.state.attachment);

      this.setState({ attachmentUrl: fileUrl });
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
