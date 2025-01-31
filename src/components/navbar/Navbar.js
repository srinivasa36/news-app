import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>NewsApp</h1>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending">Trending</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
