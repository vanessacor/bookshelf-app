import React from "react";

function Input(props) {
  const {
    name,
    type,
    value,
    onChange,
    placeholder,
    title,
    autoFocus,
    children,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      {children}

      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
}

export default Input;
