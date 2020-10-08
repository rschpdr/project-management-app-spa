import React, { Component } from "react";
import api from "../../apis/";

import LoadingSpinner from "../../components/LoadingSpinner";

import ErrorAlert from "../../components/ErrorAlert";

class ProjectDelete extends Component {
  state = {
    error: "",
  };

  // 1. Extrair o id do projeto a ser deletado da URL
  async componentDidMount() {
    try {
      // O objeto params tem as mesmas informações do objeto retornado pelo hook useParams()
      const { id } = this.props.match.params;

      // 2. Disparar uma requisiçāo do Axios do tipo delete
      const response = await api.delete(`/project/${id}`);

      console.log(response);

      // 3. Redireciona pra lista
      this.props.history.push("/project/all");
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

export default ProjectDelete;
