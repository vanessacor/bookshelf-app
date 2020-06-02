import React from "react";
import { NavLink } from "react-router-dom";

function HeaderNav() {
  return (
    <nav className="header-menu">
      <NavLink className="menu-item" activeClassName="selected" to="/home">
        Home
      </NavLink>
      <NavLink className="menu-item" activeClassName="selected" to="/books">
        Books
      </NavLink>
      <NavLink className="menu-item" activeClassName="selected" to="/authors">
        Authors
      </NavLink>
      <NavLink className="menu-item" activeClassName="selected" to="/genres">
        Genres
      </NavLink>
    </nav>
  );
}

export default HeaderNav;
