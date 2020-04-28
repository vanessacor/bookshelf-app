import React from "react";

function Select(props) {
  const {
    name,
    title,
    multiple,
    type,
    value,
    placeholder,
    options,
    onChange,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}> {title} </label>
      <select
        multiple={multiple}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
