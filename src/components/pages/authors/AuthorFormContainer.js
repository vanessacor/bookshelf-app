import React from "react";
import Input from "../../blocks/form/Input";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";
import ErrorBanner from "../../blocks/ErrorBanner";

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
      submitted: false,
    };
  }

  handleInput = (event) => {
    let { value, name } = event.target;

    this.setState((prevState) => {
      return {
        newAuthor: {
          ...prevState.newAuthor,
          [name]: value,
        },
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newAuthor } = this.state;
    const { apiClient, history } = this.props;

    apiClient.createAuthor(newAuthor).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          console.log("data", data);
          history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  };

  // handleClearForm = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     newBook: {
  //       firstName: "",
  //       familyName: "",
  //       dateOfBirth: "",
  //       dateOfDeath: "",
  //     },
  //   });
  // }

  render() {
    const { error, hasErrors } = this.state;
    console.log(hasErrors);

    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {error && <ErrorBanner />}
        <legend className="form-legend">New Author</legend>
        <Input
          type={"text"}
          title={"Author First Name"}
          name={"firstName"}
          value={this.state.newAuthor.firstName}
          placeholder={"Enter Authors First name"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"The author must have a name"}
        />

        <Input
          type={"text"}
          title={"Author Family Name"}
          name={"familyName"}
          value={this.state.newAuthor.familyName}
          placeholder={"Enter Authors Family name"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Please fill the family name"}
        />

        <Input
          type={"date"}
          title={"dateOfBirth"}
          name={"dateOfBirth"}
          value={this.state.newAuthor.dateOfBirth}
          placeholder={"Author Date of Birth"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Do you know when the author was born?"}
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

export default withApiClient(AuthorFormContainer);
