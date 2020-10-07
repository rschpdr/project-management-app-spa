import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TaskDetail() {
  // 1. Onde guardar as informações
  const [state, setState] = useState({});

  // 2. Obter as informações
  // const taskId = useParams().id;
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:4000/api/task/${id}`);

      setState({ ...response.data });
    }
    fetchData();
  }, []);

  // 3. Apresentar as informações

  return (
    <div>
      <div className="d-flex flex-column">
        <h1>Task Details</h1>
        <span>
          <strong>ID: </strong>
          {state._id}
        </span>
        <span>
          <strong>Title: </strong>
          {state.title}
        </span>
        <span>
          <strong>Description: </strong>
          {state.description}
        </span>
        <span>
          <strong>Status: </strong>
          {state.status}
        </span>
        <span>
          <strong>Creation Date: </strong>
          {new Date(state.createdAt).toLocaleDateString()}
        </span>
        <span>
          <strong>Last Updated At: </strong>
          {new Date(state.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskDetail;
