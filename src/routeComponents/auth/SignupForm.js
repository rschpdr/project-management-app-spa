import React, { useState, useEffect } from "react";
// Instância do Axios
import api from "../../apis/index";

function SignupForm() {
  // 1. Onde vamos guardar as informações do form
  const [state, setState] = useState({ email: "", name: "", password: "" });

  // 3. Tornar o formulario controlado (handleChange)
  function handleChange(event) {
    const temp = { ...state };
    temp[event.currentTarget.name] = event.currentTarget.value;
    setState(temp);
  }

  // 4. Disparar as informações do formulario para o backend
  async function handleSubmit(event) {
    // Impede o funcionamento padrāo do formulario
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  // 2. Construir o JSX

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Name form field */}
        <div className="form-group">
          <label htmlFor="signupFormNameInput">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="signupFormNameInput"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={state.name}
          />
        </div>

        {/* Email form field */}
        <div className="form-group">
          <label htmlFor="signupFormEmailInput">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="signupFormEmailInput"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={state.email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        {/* Password form field */}
        <div className="form-group">
          <label htmlFor="signupFormPasswordInput">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="signupFormPasswordInput"
            onChange={handleChange}
            value={state.password}
          />
        </div>
        {/* Submit button  */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
