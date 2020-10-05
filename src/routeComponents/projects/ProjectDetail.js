import React, { Component } from "react";
import axios from "axios";

class ProjectDetail extends Component {
  // 1. Onde guardar as informações
  state = {
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  };

  // 2. Obter as informações
  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await axios.get(`http://localhost:4000/api/project/${id}`);

    console.log(response);
    this.setState({ ...response.data });
  }

  // 3. Apresentar as informações
  render() {
    return (
      <div className="d-flex flex-column">
        <h1>Project Details</h1>
        <span>
          <strong>ID: </strong>
          {this.state._id}
        </span>
        <span>
          <strong>Title: </strong>
          {this.state.title}
        </span>
        <span>
          <strong>Description: </strong>
          {this.state.description}
        </span>
        <span>
          <strong>Creation Date: </strong>
          {new Date(this.state.createdAt).toLocaleDateString()}
        </span>
        <span>
          <strong>Last Updated At: </strong>
          {new Date(this.state.updatedAt).toLocaleDateString()}
        </span>
      </div>
    );
  }
}

export default ProjectDetail;
