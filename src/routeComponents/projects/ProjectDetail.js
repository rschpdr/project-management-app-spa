import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProjectDetail() {
  const { id } = useParams();

  // 1. Onde guardar as informações
  const [state, setState] = useState({
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  // 2. Obter as informações
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:4000/api/project/${id}`
      );

      console.log(response);
      setState({ ...response.data });
    }
    fetchData();
  }, [id]);

  // 3. Apresentar as informações

  return (
    <div className="d-flex flex-column">
      <h1>Project Details</h1>
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
        <strong>Creation Date: </strong>
        {new Date(state.createdAt).toLocaleDateString()}
      </span>
      <span>
        <strong>Last Updated At: </strong>
        {new Date(state.updatedAt).toLocaleDateString()}
      </span>
    </div>
  );
}

export default ProjectDetail;
