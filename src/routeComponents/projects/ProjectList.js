import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/";

import LoadingSpinner from "../../components/LoadingSpinner";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

function ProjectList() {
  // Nosso state inicial é 1 array vazia, pois vamos ter uma lista (array) de projetos
  const [state, setState] = useState({
    projects: [],
    loading: false,
    error: "",
  });

  // Disparar a requisiçāo HTTP para buscar os dados no servidor assim que o componente for renderizado
  useEffect(function () {
    setState({ ...state, loading: true });
    // Expressoes de funcao imediatamente invocadas
    // Immediately Invoked function expression
    (async function () {
      try {
        const response = await api.get("/project");
        console.log(response);

        setState({ ...state, loading: false, projects: [...response.data] });
      } catch (err) {
        console.error(err);
        setState({ ...state, loading: false, error: err.message });
      }
    })();
  }, []);

  return (
    <div>
      {state.loading ? (
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
            {state.projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>
                    <Link to={`/project/${project._id}`}>{project._id}</Link>
                  </td>
                  <td>
                    <Link to={`/project/${project._id}`}>{project.title}</Link>
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
      {state.error ? <ErrorAlert error={state.error} /> : null}
    </div>
  );
}

export default ProjectList;
