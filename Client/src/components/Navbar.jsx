import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "../style/navbar.css";
import { useEffect, useState } from "react";




const Nav = ({ userData }) => {
  const key = Cookies.get("token");
  const [userdata, setUserdata] = useState({});
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${key}`;
  const back = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    back("/");
    // axios.post("http://localhost:5000/logout")
    // .then(res => console.log(res))
    // .then(err => console.log(err))
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
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy" />
          </a>

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
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
}

export default Nav;
