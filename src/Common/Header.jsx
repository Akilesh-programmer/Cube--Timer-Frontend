import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-container ${isOpen ? "open" : ""}`}>
          <NavLink
            className="nav-item"
            to={"/"}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/about"}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/login"}
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/signup"}
            onClick={() => setIsOpen(false)}
          >
            Signup
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/admin"}
            onClick={() => setIsOpen(false)}
          >
            Admin
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/history"}
            onClick={() => setIsOpen(false)}
          >
            History
          </NavLink>
          <NavLink
            className="nav-item"
            to={"/contact"}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          {userId && (
            <button className="nav-item" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
