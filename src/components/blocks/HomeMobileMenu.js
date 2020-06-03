import React from "react";
import { Link } from "react-router-dom";

function HomeMobileMenu(props) {
  const { toggled, onClick } = props;
  return (
    <div className="mobile-menu">
      <button onClick={onClick} className="mobile-menu-button">
        <ion-icon name="add-outline"></ion-icon>
      </button>
      {toggled && (
        <div className="mobile-menu-list">
          <button className="mobile-menu-list-item">
            <Link to={"/books/create"}>
              <ion-icon name="book-outline"></ion-icon>
            </Link>
          </button>
          <button className="mobile-menu-list-item">
            <Link to={"/authors/create"}>
              <ion-icon name="person-outline"></ion-icon>
            </Link>
          </button>
          <button className="mobile-menu-list-item">
            <Link to={"/genres/create"}>
              <ion-icon name="pricetag-outline"></ion-icon>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default HomeMobileMenu;
