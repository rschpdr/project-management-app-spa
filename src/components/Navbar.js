import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Project Management
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/project/all">
              Projects
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/project/new">
              New Project
            </Link>
          </li>
        </ul>

        {props.user._id ? (
          <div>
            <span className="text-light">
              {props.user ? `Welcome, ${props.user.name} :)` : ""}
            </span>
            <span className="mx-2 navbar-text">|</span>
            <Link className="text-light" to="/logout">
              Logout
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
export default Navbar;
