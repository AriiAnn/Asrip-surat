import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      {/* Container wrapper */}
      <div className="container">
        {/* Toggle button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <a className="navbar-brand mt-2 mt-lg-0" href="/dashboard">
            <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy" />
          </a>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            s
            <li className="nav-item">
              <a className="nav-link text-white fs-6" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-6" href="/arsip-keluar">
                Arsip Keluar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-6" href="/arsip-masuk">
                Arsip Masuk
              </a>
            </li>
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}

        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Icon */}
          <a className="link-secondary me-3" href="#s">
            <i className="fas fa-shopping-cart"></i>
          </a>
          {/* Avatar */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-avatar">
              <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="30" alt="Black and White Portrait of a Man" loading="lazy" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
}

export default Navbar;
