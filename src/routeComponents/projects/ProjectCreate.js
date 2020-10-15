import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../apis/index";

// Importar componente de formulario
import ProjectForm from "./ProjectForm";

function ProjectCreate() {
  // Instancia do History que nos permite navegar programaticamente
  const history = useHistory();

  // Configurando o state inicial
  const [state, setState] = useState({
    title: "",
    description: "",
    loading: false,
    error: "",
  });

  // Atualiza o state toda vez que o usuario digitar ou apagar algo dentro dos campos do form
  const handleChange = (event) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Dispara a requisiçāo HTTP para o backend com os dados do formulário
  const handleSubmit = async (event) => {
    setState({ ...state, loading: true });

    try {
      // Impedir comportamento padrāo do formulário
      event.preventDefault();

      // Disparar a requisiçāo manualmente através do React
      const response = await api.post("/project", state);
      console.log(response);

      // Cancela o estado de loading
      setState({ ...state, loading: false });

      // Navega programaticamente para a lista de projetos
      history.push("/project/all");
    } catch (err) {
      console.error(err);
      setState({ ...state, loading: false, error: err.message });
    }
  };

  return (
    <div>
      <h1>New Project</h1>
      <ProjectForm
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default ProjectCreate;
