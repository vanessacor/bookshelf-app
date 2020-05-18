import React from "react";
import { withApiClient } from "../../../services/withApiClient";

import Input from "../../blocks/form/Input";
import Button from "../../blocks/Button";
import ErrorBanner from "../../blocks/ErrorBanner";

class GenreFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGenre: {
        name: "",
      },
      submitted: false,
    };
  }

  isValid() {
    const { newGenre } = this.state;
    if (!newGenre.name) {
      return false;
    } else {
      return true;
    }
  }

  handleInput = (event) => {
    let { value, name } = event.target;

    this.setState((prevState) => {
      return {
        newGenre: {
          ...prevState.newGenre,
          [name]: value,
        },
      };
    });
    console.log(this.state.newGenre.name);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState({ validationError: false, unexpectedError: false });

    const { newGenre } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.createGenre(newGenre).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          console.log(data);
          history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  };
  render() {
    const {
      newGenre,
      submitted,
      hasErrors,
      validationError,
      unexpectedError,
    } = this.state;
    const { name } = newGenre;
    console.log(hasErrors);

    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {unexpectedError && <ErrorBanner />}
        {validationError && <ErrorBanner>Please review the errors</ErrorBanner>}
        <legend className="form-legend">New Author</legend>
        <Input
          type={"text"}
          title={"Genre Name"}
          name={"name"}
          value={name}
          placeholder={"Enter a name"}
          onChange={this.handleInput}
          submitted={submitted}
          feedbackMessage={"You must give this genre a name"}
        >
          {submitted && !this.isValid() && (
            <p className="feedback">Please Give a Name</p>
          )}
        </Input>

        <Button
          className={"submit"}
          onClick={this.handleFormSubmit}
          title={"Add"}
        />
      </form>
    );
  }
}

export default withApiClient(GenreFormContainer);
