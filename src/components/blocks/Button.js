import React from "react";

function Button(props) {
  const { className, onClick, title } = props;
  const classNames = `button ${className}`;
  return (
    <button className={classNames} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
