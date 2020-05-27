import React from "react";
import { withApiClient } from "../../../services/withApiClient";

import Input from "../../blocks/form/Input";
import Button from "../../blocks/Button";
import ErrorBanner from "../../blocks/ErrorBanner";

class GenreFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: {
        name: "",
      },
      submitted: false,
    };
  }

  isValid() {
    const { genre } = this.state;
    if (!genre.name) {
      return false;
    } else {
      return true;
    }
  }

  handleInput = (event) => {
    let { value, name } = event.target;

    this.setState((prevState) => {
      return {
        genre: {
          ...prevState.genre,
          [name]: value,
        },
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState({ validationError: false, unexpectedError: false });

    const { genre } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.createGenre(genre).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  };
  render() {
    const {
      genre,
      submitted,
      hasErrors,
      validationError,
      unexpectedError,
    } = this.state;
    const { name } = genre;
    console.log(hasErrors);

    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {unexpectedError && <ErrorBanner />}
        {validationError && <ErrorBanner>Please review the errors</ErrorBanner>}
        <legend className="form-legend">New Genre</legend>
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
