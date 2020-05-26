import React, { Component } from "react";

import { withApiClient } from "../../../services/withApiClient";

import Input from "../../blocks/form/Input";
import Select from "../../blocks/form/Select";
import RadioButton from "../../blocks/form/RadioButton";
import Button from "../../blocks/Button";
import MultiCheckBox from "../../blocks/form/MultiCheckBox";
import ErrorBanner from "../../blocks/ErrorBanner";

function depopulate(book) {
  const { id, title, author, genre, status, summary, isbn } = book;
  const authorId = author.id;
  const genreIds = genre.map((genre) => genre.id);

  return {
    id,
    title,
    author: authorId,
    genre: genreIds,
    status,
    summary,
    isbn,
  };
}
class BookEdit extends Component {
  constructor(props) {
    super(props);
    //if not location state redirect
    const book = this.props.location.state.book;
    const depopulatedBook = depopulate(book);
    this.state = {
      error: undefined,
      book: depopulatedBook,
      authorsOptions: [],
      genreOptions: [],
      selectedStatus: "",
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
    const { book } = this.state;
    if (!book[input]) {
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
        book: {
          ...prevState.book,
          [name]: value,
        },
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState({ validationError: false, unexpectedError: false });

    const { book } = this.state;

    const { apiClient, history } = this.props;

    if (!this.isValid()) {
      this.setState({ validationError: true, submitted: true });
      return;
    }

    apiClient.updateBook(book).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          history.push(data.url);
        });
      } else {
        // TODO if state.unexpected show "unexpected error"
        this.setState({ unexpectedError: true });
      }
    });
  };

  render() {
    const {
      book,
      authorsOptions,
      genreOptions,
      validationError,
      unexpectedError,
      submitted,
    } = this.state;

    const { title, author, genre, status, summary, isbn } = book;
    const authors = authorsOptions.map((author) => {
      return { value: author.id, label: author.name };
    });
    const genres = genreOptions.map((item) => {
      return {
        value: item.id,
        label: item.name,
        checked: genre.includes(item.id),
      };
    });
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {unexpectedError && <ErrorBanner />}
        {validationError && <ErrorBanner>Please review the errors</ErrorBanner>}
        <legend className="form-legend">Edit Book</legend>
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

        <MultiCheckBox // rename to MultiCheckBox
          title={"Genre"}
          name={"genre"}
          options={genres}
          value={genre}
          onChange={this.handleInput}
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
            isSelected={status === "Read"}
            value={"Read"}
            label={"Read"}
            onChange={this.handleInput}
          />
          <RadioButton
            name={"status"}
            id={"Unread"}
            isSelected={status === "Unread"}
            value={"Unread"}
            label={"Unread"}
            onChange={this.handleInput}
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
          title={"Save"}
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

export default withApiClient(BookEdit);
