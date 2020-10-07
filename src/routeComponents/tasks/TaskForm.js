import React from "react";

// Importando botāo de loading
import LoadingButton from "../../components/LoadingButton";

// Importando mensagem de erro
import ErrorAlert from "../../components/ErrorAlert";

function TaskForm(props) {
  const { handleSubmit, handleChange, state } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="titleTaskInput">Title</label>
        <input
          type="text"
          className="form-control"
          id="titleTaskInput"
          name="title"
          // Tornando input controlado
          onChange={handleChange}
          value={state.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionTaskInput">Description</label>
        <textarea
          className="form-control"
          id="descriptionTaskInput"
          name="description"
          // Tornando input controlado
          onChange={handleChange}
          value={state.description}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="descriptionTaskInput">Status</label>
        <select
          className="form-control"
          id="statusTaskInput"
          name="status"
          // Tornando input controlado
          onChange={handleChange}
          value={state.status}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
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

export default TaskForm;
