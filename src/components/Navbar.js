import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>NewsApp</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>News</li>
        <li>Showbiz</li>
      </ul>
    </nav>
  );
};

export default Navbar;
