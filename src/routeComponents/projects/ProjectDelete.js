import React, { useState, useEffect } from "react";
import api from "../../apis/";

import LoadingSpinner from "../../components/LoadingSpinner";

import ErrorAlert from "../../components/ErrorAlert";

function ProjectDelete(props) {
  const [state, setState] = useState({
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // O objeto params tem as mesmas informações do objeto retornado pelo hook useParams()
        const { id } = props.match.params;

        // 2. Disparar uma requisiçāo do Axios do tipo delete
        const response = await api.delete(`/project/${id}`);

        console.log(response);

        // 3. Redireciona pra lista
        props.history.push("/project/all");
      } catch (err) {
        console.error(err);
        setState({ error: err.message });
      }
    }
    fetchData();
  }, [props.match.params, props.history]);

  return (
    <div>
      {state.error ? (
        <ErrorAlert error={state.error} />
      ) : (
        <div>
          Deleting...
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default ProjectDelete;
