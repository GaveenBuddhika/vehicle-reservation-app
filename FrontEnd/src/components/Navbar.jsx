import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">INFOSEC VEHICLE RESERVATION </div>
        <div className="nav-links">
          <Link className="nav-item" to="/">
            Home
          </Link>
          <Link className="nav-item" to="/book">
            Book
          </Link>
          <Link className="nav-item" to="/view">
            Reservations
          </Link>

          {isAuthenticated && (
            <Link className="nav-item" to="/profile">
              Profile
            </Link>
          )}

          <span>
            {!isAuthenticated ? (
              <button onClick={() => loginWithRedirect()} className="login-btn">
                Log In
              </button>
            ) : (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="logout-btn"
              >
                Log Out
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
