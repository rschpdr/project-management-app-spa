import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../apis/";

import ProjectForm from "./ProjectForm";

import LoadingSpinner from "../../components/LoadingSpinner";

function ProjectEdit(props) {
  // Instancia do History que nos permite navegar programaticamente
  const history = useHistory();

  const { id } = props.match.params;

  const [state, setState] = useState({
    title: "",
    description: "",
    error: "",
    count: 0,
  });
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);

  // 0. Buscar os dados existentes deste projeto
  useEffect(() => {
    setIsLoadingFetch(true);
    (async function () {
      try {
        const response = await api.get(`/project/${id}`);

        console.log(response);
        setIsLoadingFetch(false);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
        setIsLoadingFetch(false);
        setState({ ...state, error: err.message });
      }
    })();
  }, [id]);

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  const handleChange = (event) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Dispara a requisiçāo HTTP para o backend com os dados do formulário
  const handleSubmit = async (event) => {
    setIsLoadingSend(true);

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await api.patch(`/project/${id}`, state);
      console.log(response);

      // Cancela o estado de loading
      setIsLoadingSend(false);

      // Navega programaticamente para a lista de projetos
      history.push("/project/all");
    } catch (err) {
      console.error(err);
      setIsLoadingSend(false);
      setState({ ...state, error: err.message });
    }
  };

  // 1. Popular o formulario com os dados existentes

  // 2. Enviar os dados atualizados para o servidor

  return (
    <div>
      <h1>Edit Project</h1>
      {isLoadingFetch ? (
        <LoadingSpinner />
      ) : (
        <ProjectForm
          state={{ ...state, loading: isLoadingSend }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default ProjectEdit;
