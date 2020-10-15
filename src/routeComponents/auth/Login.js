import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis";

function Login(props) {
  // 1. Onde vamos guardar os dados do form (state)
  const [state, setState] = useState({ email: "", password: "" });

  // 2. Atualizar o state com os dados do form
  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  // 4. Enviar a requisicāo POST para o backend
  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const response = await api.post("/login", state);

      console.log(response);

      props.setLoggedInUser({ ...response.data.user });

      // 5. Persistir as informações do usuário no localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  // 3. Construir o JSX
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <Link to="/profile">Go to Profile</Link>
      </form>
    </div>
  );
}

export default Login;
