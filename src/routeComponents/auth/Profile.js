import React, { useState, useEffect } from "react";
import api from "../../apis";

function Profile() {
  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/profile");

        console.log(response);
        setState({ ...response.data.user });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>
        <strong>ID: </strong>
        {state._id}
      </p>
      <p>
        <strong>Name: </strong>
        {state.name}
      </p>
      <p>
        <strong>Email: </strong>
        {state.email}
      </p>
    </div>
  );
}

export default Profile;
