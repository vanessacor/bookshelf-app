import React from "react";
import moment from "moment";

import Input from "../../blocks/form/Input";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";
import ErrorBanner from "../../blocks/ErrorBanner";

function depopulate(author) {
  const { id, name, dateOfBirth, dateOfDeath } = author;

  const nameArray = name.split(" ");
  const firstName = nameArray[1];
  const familyName = nameArray[0].slice(0, -1);
  let formatedDateOfBirth;
  let formatedDateOfDeath;
  if (dateOfBirth) {
    formatedDateOfBirth = moment(dateOfBirth).format("YYYY-MM-DD");
  } else {
    formatedDateOfBirth = "";
  }
  if (dateOfDeath) {
    formatedDateOfDeath = moment(dateOfDeath).format("YYYY-MM-DD");
  } else {
    formatedDateOfDeath = "";
  }

  return {
    id,
    firstName,
    familyName,
    dateOfBirth: formatedDateOfBirth,
    dateOfDeath: formatedDateOfDeath,
  };
}

class AuthorEdit extends React.Component {
  constructor(props) {
    super(props);
    const author = this.props.location.state.author;
    const depopulatedAuthor = depopulate(author);
    this.state = {
      author: depopulatedAuthor,
      submitted: false,
      error: undefined,
    };
  }

  isInputValid(input) {
    const { author } = this.state;
    if (!author[input]) {
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
        author: {
          ...prevState.author,
          [name]: value,
        },
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState({ validationError: false, unexpectedError: false });

    const { author } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.updateAuthor(author).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  };

  render() {
    const { author, submitted, validationError, unexpectedError } = this.state;
    const { firstName, familyName, dateOfBirth, dateOfDeath } = author;

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
          title={"Change"}
        />
      </form>
    );
  }
}

export default withApiClient(AuthorEdit);
