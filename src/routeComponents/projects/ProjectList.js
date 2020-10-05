import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../../components/LoadingSpinner";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

class ProjectList extends Component {
  // Nosso state inicial é 1 array vazia, pois vamos ter uma lista (array) de projetos
  state = {
    projects: [],
    loading: false,
    error: "",
  };

  // Disparar a requisiçāo HTTP para buscar os dados no servidor assim que o componente for renderizado

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.get("http://localhost:4000/api/project");
      console.log(response);

      this.setState({ loading: false, projects: [...response.data] });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: err.message });
    }
  }

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
                    <td>
                      <Link
                        className="btn btn-primary mr-1"
                        to={`/project/edit/${project._id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-danger"
                        to={`/project/delete/${project._id}`}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
      </div>
    );
  }
}

export default ProjectList;
