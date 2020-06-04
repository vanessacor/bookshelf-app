import React from "react";
import { Link } from "react-router-dom";

function AddFab(props) {
  const { link, className } = props;
  const classNames = `add-fab ${className}`;

  return (
    <button className={classNames}>
      <Link to={link}>
        <ion-icon className="icon" name="add-outline"></ion-icon>
      </Link>
    </button>
  );
}

export default AddFab;
