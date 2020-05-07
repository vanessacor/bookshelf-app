import React from "react";
import Input from "../../blocks/form/Input";
import Button from "../../blocks/Button";

class AuthorFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAuthor: {
        firstName: "",
        familyName: "",
        dateOfBirth: "",
        dateOfDeath: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      (prevState) => {
        return {
          newAuthor: {
            ...prevState.newAuthor,
            [name]: value,
          },
        };
      },
      () => console.log(this.state.newAuthor)
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let authorData = this.state.newAuthor;
    console.log("book data", authorData);
    // const authorDataJson = JSON.stringify(authorData);
    // console.log("bookData Json", authorDataJson);

    fetch("http://localhost:8000/authors", {
      method: "POST",
      body: JSON.stringify(authorData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log("Successful" + data);
      });
    });
  }
  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      newBook: {
        firstName: "",
        familyName: "",
        dateOfBirth: "",
        dateOfDeath: "",
      },
    });
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        <legend className="form-legend">New Author</legend>
        <Input
          type={"text"}
          title={"Author First Name"}
          name={"firstName"}
          value={this.state.newAuthor.firstName}
          placeholder={"Enter Authors First name"}
          onChange={this.handleInput}
        />

        <Input
          type={"text"}
          title={"Author Family Name"}
          name={"familyName"}
          value={this.state.newAuthor.familyName}
          placeholder={"Enter Authors Family name"}
          onChange={this.handleInput}
        />

        <Input
          type={"date"}
          title={"dateOfBirth"}
          name={"dateOfBirth"}
          value={this.state.newAuthor.dateOfBirth}
          placeholder={"Author Date of Birth"}
          onChange={this.handleInput}
        />

        <Input
          type={"date"}
          title={"dateOfDeath"}
          name={"dateOfDeath"}
          value={this.state.newAuthor.dateOfDeath}
          placeholder={"Author Date of Death"}
          onChange={this.handleInput}
        />

        <Button
          className={"submit"}
          onClick={this.handleFormSubmit}
          title={"Add"}
        />
      </form>
    );
  }
}

export default AuthorFormContainer;
