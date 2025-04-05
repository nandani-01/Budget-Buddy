import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import logoimage from "../img/data.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useThemeContext } from "../context/ThemeContext";



const Navbar = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { isDarkTheme, toggleTheme } = useThemeContext();


  const handleLogout = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => {
        navigate('/') // Update state after logout
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <>
      {/* Extracted CSS from PrivateNavbar.js */}
      <style>{`
        a.navbar-brand {
          max-width: 20%;
        }
        .img-flex {
          max-width: 25%;
          height: auto;
        }
        .rounded-2 {
          border-radius: 0.25rem;
        }
        body {
          background-color: ${isDarkTheme ? "#121212" : "#fff"};
          color: ${isDarkTheme ? "white" : "black"};
        }
        .navbar {
          background-color: ${isDarkTheme ? "#1c1c1c" : "#f8f9fa"} !important;
        }
        .nav-link {
          color: ${isDarkTheme ? "#f8f9fa" : "#000"} !important;
        }
        .btn-outline-secondary {
          border-color: ${isDarkTheme ? "#f8f9fa" : "#000"};
        }
      `}</style>

<nav className={`navbar navbar-expand-lg ${isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-lg`}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logoimage} alt="Logo" className="img-flex me-4 rounded-2" />
            <span className={`fw-bold fs-4 ${isDarkTheme ? "text-light" : "text-dark"}`}>Budget Buddy</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-toggler border-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/record/transactions" className="nav-link text-white fw-semibold">
                  Transaction Records
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/api/dashboard" className="nav-link text-white fw-semibold">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/api/profile" className="nav-link text-white fw-semibold">
                  Profile
                </Link>
              </li>
            </ul>

            <button className="btn btn-outline-secondary ms-3" onClick={toggleTheme}>
              {isDarkTheme ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* Login & Logout Buttons */}
            <div className="d-flex ms-3">
              {cookies.token ? (
                <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-info me-2 fw-bold">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-outline-warning fw-bold">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
