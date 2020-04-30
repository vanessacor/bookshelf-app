import React from "react";
import { Link } from "react-router-dom";

function HeaderNav() {
  return (
    <nav className="header-menu">
      <ul>
        <li className="header-menu-link">
          <Link to="/">Home</Link>
        </li>
        <li className="header-menu-link">
          <Link to="/books">Books</Link>
        </li>
        <li className="header-menu-link">
          <Link to="/authors">Authors</Link>
        </li>
        <li className="header-menu-link">
          <Link to="/genres">Genres</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
