import React, { Component } from "react";

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleChange = (event) => {
    const { onChange, name } = this.props;
    const { value } = event.target;

    const optionEvent = {
      target: {
        name: name,
        value: value,
      },
    };

    onChange(optionEvent);
  };

  render() {
    const { title, name, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {title}
        </label>
        <div className="form-checkbox">
          {options.map((option) => {
            return (
              <label key={option.value}>
                <input
                  id={option.name}
                  name={option.name}
                  checked={option.checked} // value.includes(option.id)
                  onChange={this.handleChange}
                  value={option.value}
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
}

export default CheckBox;
