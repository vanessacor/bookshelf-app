import React from "react";

function CheckBox(props) {
  const {
    title,
    name,
    options,
    checked,
    onChange,
    submitted,
    feedbackMessage,
  } = props;
  // let checked = name === value ? "true" : "";
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      {submitted && <p className="feedback">{feedbackMessage} </p>}
      <div className="form-checkbox">
        {options.map((option) => {
          return (
            <label key={option.value}>
              <input
                id={name}
                name={name}
                onChange={onChange}
                value={option.value}
                checked={checked.indexOf(option) > -1}
                type="checkbox"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default CheckBox;
