import React, { Component } from "react";
import api from "../../apis/";

import LoadingSpinner from "../../components/LoadingSpinner";

import ErrorAlert from "../../components/ErrorAlert";

class TaskDelete extends Component {
  state = { error: "" };

  async componentDidMount() {
    // 1. Saber qual tarefa iremos deletar
    // 2. Extrair o id da tarefa da url
    const { id } = this.props.match.params;
    const { projectId } = this.props.location.state;

    try {
      // 3. Disparar a requisicao para o servidor com a tarefa a ser deletada
      await api.delete(`/task/${projectId}/${id}`);

      // 4. Volta pra lista
      this.props.history.goBack();
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message });
    }
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <ErrorAlert error={this.state.error} />
        ) : (
          <div>
            Deleting...
            <LoadingSpinner />
          </div>
        )}
      </div>
    );
  }
}

export default TaskDelete;
