import React, { Component } from "react";

import { withApiClient } from "../../../services/withApiClient";

import Input from "../../blocks/form/Input";
import Select from "../../blocks/form/Select";
import RadioButton from "../../blocks/form/RadioButton";
import Button from "../../blocks/Button";
import CheckBox from "../../blocks/form/CheckBox";
import ErrorBanner from "../../blocks/ErrorBanner";

class BookFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      newBook: {
        title: "",
        author: "",
        genre: "",
        status: "Read",
        summary: "",
        isbn: "",
      },
      authorsOptions: [],
      genreOptions: [],
      selectedStatus: "Read",
      selectedGenres: [],
      submitted: false,
    };
  }

  componentDidMount() {
    const { apiClient } = this.props;

    Promise.all([apiClient.getAllAuthors(), apiClient.getAllGenres()]).then(
      ([res1, res2]) => {
        this.setState({
          authorsOptions: res1,
          genreOptions: res2,
        });
      }
    );
  }

  isInputValid(input) {
    const { newBook } = this.state;
    if (!newBook[input]) {
      return false;
    } else {
      return true;
    }
  }

  isValid() {
    if (!this.isInputValid("title") || !this.isInputValid("author")) {
      return false;
    }
    return true;
  }

  handleInput = (event) => {
    let { value, name } = event.target;

    this.setState((prevState) => {
      return {
        newBook: {
          ...prevState.newBook,
          [name]: value,
        },
      };
    });
  };

  handleRadioBtn = (event) => {
    let { value, name } = event.target;

    this.setState((prevState) => {
      return {
        newBook: {
          ...prevState.newBook,
          [name]: value,
        },
        selectedStatus: value,
      };
    });
  };

  handleCheckBox = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    const { selectedGenres } = this.state;

    let newSelectionArray;

    if (selectedGenres.indexOf(value) > -1) {
      newSelectionArray = selectedGenres.filter((s) => s !== value);
    } else {
      newSelectionArray = [...selectedGenres, value];
    }

    this.setState((prevState) => {
      return {
        newBook: {
          ...prevState.newBook,
          [name]: newSelectionArray,
        },
        selectedGenres: [newSelectionArray],
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState({ validationError: false, unexpectedError: false });

    const { newBook } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.createBook(newBook).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          history.push(data.url);
        });
      } else {
        // TODO if state.unexpected show "unexpected error"
        this.setState({ unexpectedError: true });
      }
    });
  };

  handleClearForm = (event) => {
    event.preventDefault();
    this.setState({
      newBook: {
        title: "",
        author: "",
        genre: [],
        status: "Read",
        summary: "",
        isbn: "",
      },
    });
  };

  render() {
    const {
      newBook,
      authorsOptions,
      genreOptions,
      validationError,
      unexpectedError,
      submitted,
    } = this.state;

    const { title, author, summary, isbn } = newBook;
    const authors = authorsOptions.map((author) => {
      return { value: author.id, label: author.name };
    });
    const genres = genreOptions.map((genre) => {
      return { value: genre.id, label: genre.name };
    });
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {unexpectedError && <ErrorBanner />}
        {validationError && <ErrorBanner>Please review the errors</ErrorBanner>}
        <legend className="form-legend">New Book</legend>
        <Input
          type={"text"}
          title={"Book Title"}
          name={"title"}
          value={title}
          placeholder={"Enter the Title"}
          onChange={this.handleInput}
        >
          {submitted && !this.isInputValid("title") && (
            <p className="feedback">Please Give a Title</p>
          )}
        </Input>

        <Select
          multiple={false}
          title={"Author"}
          name={"author"}
          options={authors}
          value={author}
          placeholder={"Select author"}
          onChange={this.handleInput}
        >
          {submitted && !this.isInputValid("author") && (
            <p className="feedback">Please select an Author</p>
          )}
        </Select>

        <CheckBox
          title={"Genre"}
          name={"genre"}
          options={genres}
          checked={this.state.selectedGenres}
          onChange={this.handleCheckBox}
          submitted={this.state.submitted}
          feedbackMessage={"Please choose one genre"}
        />

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <RadioButton
            name={"status"}
            id={"Read"}
            isSelected={this.state.selectedStatus === "Read"}
            value={"Read"}
            label={"Read"}
            onChange={this.handleRadioBtn}
          />
          <RadioButton
            name={"status"}
            id={"Unread"}
            isSelected={this.state.selectedStatus === "Unread"}
            value={"Unread"}
            label={"Unread"}
            onChange={this.handleRadioBtn}
          />
        </div>
        <Input
          type={"text"}
          title={"Summary"}
          name={"summary"}
          value={summary}
          placeholder={"Write a Summary"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"no summary ?"}
        />
        <Input
          type={"text"}
          title={"ISBN"}
          name={"isbn"}
          value={isbn}
          placeholder={"Book Isbn"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Please Insert book ISBN"}
        />
        <Button
          className={"button-submit"}
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

export default withApiClient(BookFormContainer);
