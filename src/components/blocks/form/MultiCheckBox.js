import React, { Component } from "react";

class MultiCheckBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleChange = (event) => {
    const { onChange, name } = this.props;
    let genre = this.props.value;
    const { value } = event.target;

    if (genre.indexOf(value) > -1) {
      const updatedGenre = genre.filter((item) => item !== value);
      genre = updatedGenre;
    } else {
      genre = [...genre, value];
    }

    const optionEvent = {
      target: {
        name: name,
        value: genre,
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

export default MultiCheckBox;
