import React from "react";

function Select(props) {
  const {
    name,
    title,
    multiple,
    value, // string = value
    placeholder,
    options, // [value: , label: }]
    onChange,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}> {title} </label>
      <select
        multiple={multiple}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              label={option.label}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
