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

  isInputValid(input) {
    const { newAuthor } = this.state;
    if (!newAuthor[input]) {
      return false;
    } else {
      return true;
    }
  }

  isValid() {
    if (
      !this.isInputValid("firstName") ||
      !this.isInputValid("familyName") ||
      !this.isInputValid("dateOfBirth")
    ) {
      return false;
    }
    return true;
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

    this.setState({ validationError: false, unexpectedError: false });

    const { newAuthor } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.createAuthor(newAuthor).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  };

  handleClearForm = (event) => {
    event.preventDefault();
    this.setState({
      newAuthor: {
        firstName: "",
        familyName: "",
        dateOfBirth: "",
        dateOfDeath: "",
      },
    });
  };

  render() {
    const {
      newAuthor,
      submitted,
      hasErrors,
      validationError,
      unexpectedError,
    } = this.state;
    const { firstName, familyName, dateOfBirth, dateOfDeath } = newAuthor;
    console.log(hasErrors);

    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {unexpectedError && <ErrorBanner />}
        {validationError && <ErrorBanner>Please review the errors</ErrorBanner>}
        <legend className="form-legend">New Author</legend>
        <Input
          type={"text"}
          title={"Author First Name"}
          name={"firstName"}
          value={firstName}
          placeholder={"Enter Authors First name"}
          onChange={this.handleInput}
          submitted={submitted}
          feedbackMessage={"The author must have a name"}
        >
          {submitted && !this.isInputValid("firstName") && (
            <p className="feedback">Please Give a Name</p>
          )}
        </Input>

        <Input
          type={"text"}
          title={"Author Family Name"}
          name={"familyName"}
          value={familyName}
          placeholder={"Enter Authors Family name"}
          onChange={this.handleInput}
          submitted={submitted}
          feedbackMessage={"Please fill the family name"}
        >
          {submitted && !this.isInputValid("familyName") && (
            <p className="feedback">Please Give a Family Name</p>
          )}
        </Input>

        <Input
          type={"date"}
          title={"Date Of Birth"}
          name={"dateOfBirth"}
          value={dateOfBirth}
          placeholder={"Author Date of Birth"}
          onChange={this.handleInput}
        >
          {submitted && !this.isInputValid("dateOfBirth") && (
            <p className="feedback">Please insert a Date of Birth</p>
          )}
        </Input>

        <Input
          type={"date"}
          title={"dateOfDeath"}
          name={"dateOfDeath"}
          value={dateOfDeath}
          placeholder={"Author Date of Death"}
          onChange={this.handleInput}
        />

        <Button
          className={"submit"}
          onClick={this.handleFormSubmit}
          title={"Add"}
        />

        <Button
          className={"button-clear"}
          onClick={this.handleClearForm}
          title={"Clear"}
        />
      </form>
    );
  }
}

export default withApiClient(AuthorFormContainer);
