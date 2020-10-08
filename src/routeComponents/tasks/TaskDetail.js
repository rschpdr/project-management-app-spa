import React, { Component } from "react";
import { useParams } from "react-router-dom";
import api from "../../apis/";

class TaskDetail extends Component {
  // 1. Onde guardar as informações
  state = {
    _id: "",
    title: "",
    description: "",
    status: "",
    attachmentUrl: "",
    createdAt: "",
    updatedAt: "",
  };

  // 2. Obter as informações

  async componentDidMount() {
    // const taskId = useParams().id;
    const { id } = this.props.match.params;

    const response = await api.get(`/task/${id}`);

    this.setState({ ...response.data });
  }

  // 3. Apresentar as informações
  render() {
    return (
      <div>
        <div className="d-flex flex-column">
          <h1>Task Details</h1>
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
            <strong>Status: </strong>
            {this.state.status}
          </span>
          <span>
            <strong>Creation Date: </strong>
            {new Date(this.state.createdAt).toLocaleDateString()}
          </span>
          <span>
            <strong>Last Updated At: </strong>
            {new Date(this.state.updatedAt).toLocaleDateString()}
          </span>
          <div className="w-50">
            <strong>Attachment Image: </strong>
            <img
              alt={`${this.state.description} attachment`}
              src={this.state.attachmentUrl}
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDetail;
