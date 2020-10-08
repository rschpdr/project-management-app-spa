import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

// Modal de confirmaçāo para deletar projeto
import ConfirmationModal from "../../components/ConfirmationModal";

import api from "../../apis";

class ProjectList extends Component {
  // Nosso state inicial é 1 array vazia, pois vamos ter uma lista (array) de projetos
  state = {
    projects: [],
    loading: false,
    error: "",
    showModal: false,
    selectedRowId: "",
  };

  // Disparar a requisiçāo HTTP para buscar os dados no servidor assim que o componente for renderizado

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await api.get("/project");

      this.setState({ loading: false, projects: [...response.data] });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  }

  handleModalToggle = (projectId) => {
    // Retornando um objeto diretamente da arrow function
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedRowId: projectId,
    }));
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <LoadingSpinner />
        ) : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col"># of Tasks</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project) => {
                return (
                  <tr key={project._id}>
                    <td>
                      <Link to={`/project/${project._id}`}>{project._id}</Link>
                    </td>
                    <td>
                      <Link to={`/project/${project._id}`}>
                        {project.title}
                      </Link>
                    </td>
                    <td>{project.tasks.length}</td>
                    <td>
                      <Link
                        className="btn btn-primary mr-1"
                        to={`/project/edit/${project._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleModalToggle(project._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
        <ConfirmationModal
          id="projectDeleteConfirmationModal"
          show={this.state.showModal}
          handleClose={this.handleModalToggle}
          projectId={this.state.selectedRowId}
        />
      </div>
    );
  }
}

export default ProjectList;
