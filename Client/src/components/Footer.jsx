import React from "react";
import "../style/login.css";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-md-5 bg-primary fixed-bottom">
      {/* Copyright */}
      <div className="text-white mb-3 mb-md-0">Copyright © 2024 by PLN Icon Plus. All rights reserved.</div>

      {/* Social Media Icons */}
      <div className="mt-3 mt-md-0">
        <a href="#!" className="text-white me-4">
          <FaFacebookF />
        </a>
        <a href="#!" className="text-white me-4">
          <FaTwitter />
        </a>
        <a href="#!" className="text-white me-4">
          <FaGoogle />
        </a>
        <a href="#!" className="text-white">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default Footer;
