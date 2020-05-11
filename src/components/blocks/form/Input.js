import React from "react";

function Input(props) {
  const {
    name,
    type,
    value,
    onChange,
    placeholder,
    title,
    submitted,
    feedbackMessage,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      {submitted && <p className="feedback">{feedbackMessage} </p>}

      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
