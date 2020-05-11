import React from "react";

import { withApiClient } from "../../../services/withApiClient";
import Input from "../../blocks/form/Input";
import Select from "../../blocks/form/Select";
import RadioButton from "../../blocks/form/RadioButton";
import Button from "../../blocks/Button";
import CheckBox from "../../blocks/form/CheckBox";
import ErrorBanner from "../../blocks/ErrorBanner";

class BookFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      newBook: {
        title: "",
        author: {
          name: "",
          id: "",
        },
        genre: "",
        status: "",
        summary: "",
        isbn: "",
      },
      authorsOptions: [],
      genreOptions: [],
      selectedStatus: "Read",
      selectedGenres: [],
      submitted: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleRadioBtn = this.handleRadioBtn.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
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

  handleInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState((prevState) => {
      return {
        newBook: {
          ...prevState.newBook,
          [name]: value,
        },
      };
    });
  }

  handleRadioBtn(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState((prevState) => {
      return {
        newBook: {
          ...prevState.newBook,
          [name]: value,
        },
        selectedStatus: value,
      };
    });
  }

  handleCheckBox(event) {
    event.preventDefault();
    const newSelection = event.target.value;
    const name = event.target.name;

    let newSelectionArray;

    if (this.state.selectedGenres.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedGenres.filter(
        (s) => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedGenres, newSelection];
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
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let bookData = this.state.newBook;

    const { apiClient } = this.props;

    apiClient.createBook(bookData).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          this.props.history.push(data.url);
        });
      } else {
        this.setState({ error: true, submitted: true });
      }
    });
  }

  handleClearForm(event) {
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
  }

  render() {
    const { error, hasErrors } = this.state;
    console.log(hasErrors);

    const authors = this.state.authorsOptions.map((author) => {
      return { value: author.id, label: author.name };
    });
    const genres = this.state.genreOptions.map((genre) => {
      return { value: genre.id, label: genre.name };
    });
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        {error && <ErrorBanner />}
        <legend className="form-legend">New Book</legend>
        <Input
          type={"text"}
          title={"Book Title"}
          name={"title"}
          value={this.state.newBook.title}
          placeholder={"Enter the Title"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Please Give a Title"}
        />
        <Select
          multiple={false}
          title={"Author"}
          name={"author"}
          options={authors}
          value={this.state.newBook.author}
          placeholder={"Select author"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Please select an Author"}
        />

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
            isSelected={this.state.status === "Read"}
            value={"Read"}
            label={"Read"}
            onChange={this.handleRadioBtn}
          />
          <RadioButton
            name={"status"}
            id={"Unread"}
            isSelected={this.state.status === "Unread"}
            value={"Read"}
            label={"Unread"}
            onChange={this.handleRadioBtn}
          />
        </div>
        <Input
          type={"text"}
          title={"Summary"}
          name={"summary"}
          value={this.state.newBook.summary}
          placeholder={"Write a Summary"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"no summary ?"}
        />
        <Input
          type={"text"}
          title={"ISBN"}
          name={"isbn"}
          value={this.state.newBook.isbn}
          placeholder={"Book Isbn"}
          onChange={this.handleInput}
          submitted={this.state.submitted}
          feedbackMessage={"Please Insert book ISBN"}
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

export default withApiClient(BookFormContainer);
