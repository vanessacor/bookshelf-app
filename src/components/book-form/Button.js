import React from "react";

function Button(props) {
  const { className, onClick, title } = props;
  console.log(className);
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
