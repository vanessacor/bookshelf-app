import React from "react";

function CheckBox(props) {
  const { title, name, options, checked, onChange } = props;
  // let checked = name === value ? "true" : "";
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <div className="checkbox-group">
        {options.map((option) => {
          return (
            <label key={option.value}>
              <input
                className="form-checkbox"
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
