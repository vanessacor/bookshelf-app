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
    children,
  } = props;
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {title}
      </label>
      {children}

      <select
        multiple={multiple}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input form-select"
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
