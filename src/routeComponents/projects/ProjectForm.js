import React from "react";

// Importando botāo de loading
import LoadingButton from "../../components/LoadingButton";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

function ProjectForm(props) {
  const { handleSubmit, handleChange, state } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="titleProjectInput">Title</label>
        <input
          type="text"
          className="form-control"
          id="titleProjectInput"
          name="title"
          // Tornando input controlado
          onChange={handleChange}
          value={state.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionProjectInput">Description</label>
        <textarea
          className="form-control"
          id="descriptionProjectInput"
          name="description"
          // Tornando input controlado
          onChange={handleChange}
          value={state.description}
        ></textarea>
      </div>
      {/* Renderizaçāo condicional do botāo de loading */}
      {state.loading ? (
        <LoadingButton />
      ) : (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      )}
      {/* Renderizaçāo condicional do alerta de erro */}
      {state.error ? <ErrorAlert error={state.error} /> : null}
    </form>
  );
}

export default ProjectForm;
