import React from "react";

function RadioButton(props) {
  const { name, id, onChange, value, isSelected, label } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        id={id}
        value={value}
        type="radio"
        defaultChecked={isSelected}
        onChange={onChange}
      />
    </div>
  );
}

export default RadioButton;
