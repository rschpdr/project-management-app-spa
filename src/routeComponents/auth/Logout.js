import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    // Usando JWT nāo precisamos fazer o logout no servidor, pois o servidor nāo armazena os tokens. Basta limpar o localStorage e o state de usuario logado
    localStorage.removeItem("loggedInUser");
    console.log(this.props);
    this.props.handleLogout();
    this.props.history.push("/login");
    // Força um reload na página para limpar a memória do roteador
    this.props.history.go();
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default Logout;
