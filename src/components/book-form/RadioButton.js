import React from "react";

function RadioButton(props) {
  const { name, id, onChange, value, isSelected, label } = props;
  return (
    <div className="form-group">
      <input
        name={name}
        id={id}
        value={value}
        type="radio"
        defaultChecked={isSelected}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioButton;
