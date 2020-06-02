import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddFab(props) {
  const { link, className } = props;
  const classNames = `add-fab ${className}`;

  return (
    <button className={classNames}>
      <Link to={link}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </button>
  );
}

export default AddFab;
