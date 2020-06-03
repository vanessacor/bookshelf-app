import React from "react";
import { Link } from "react-router-dom";

function HomeDesktopMenu(props) {
  const { toggled, onClick } = props;

  return (
    <div className="desktop-menu">
      <button onClick={onClick} className="button desktop-menu-button">
        Add
      </button>
      {toggled && (
        <div className="desktop-menu-list">
          <Link className="desktop-menu-list-item" to={"/books/create"}>
            Add Book
          </Link>
          <Link className="desktop-menu-list-item" to={"/authors/create"}>
            Add Author
          </Link>
          <Link className="desktop-menu-list-item" to={"/genres/create"}>
            Add Genre
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomeDesktopMenu;
