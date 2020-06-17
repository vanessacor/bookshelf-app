import React from "react";

function Button(props) {
  const { className, onClick, title, disabled } = props;
  const classNames = `button ${className}`;
  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
