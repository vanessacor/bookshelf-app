import React from "react";
import HeaderNav from "./HeaderNav";

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">My Bookshelf</h1>
      <HeaderNav />
    </header>
  );
}

export default Header;
