import React from "react";
import { Link } from "react-router-dom";

function TaskList(props) {
  const { id } = props.match.params;

  return (
    <ul>
      {props.tasks.map((task) => {
        return (
          <li key={task._id} className="p-1">
            <Link to={`/task/${task._id}`}>{task.title}</Link>
            <Link
              className="btn btn-primary btn-sm mx-2"
              to={`/task/edit/${task._id}`}
            >
              Edit
            </Link>
            <Link
              className="btn btn-danger btn-sm"
              to={{
                pathname: `/task/delete/${task._id}`,
                state: { projectId: id },
              }}
            >
              Delete
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
