import React from "react";

class TextInput extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({
      title: value,
    });
  };

  render() {
    return (
      <div>
        <div className="text-input">
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <label>Title</label>
        </div>
      </div>
    );
  }
}

export default TextInput;
