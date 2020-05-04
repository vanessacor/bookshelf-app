import React from "react";
import Input from "../../blocks/form/Input";
import Select from "../../blocks/form/Select";
import RadioButton from "../../blocks/form/RadioButton";
import Button from "../../blocks/Button";
import CheckBox from "../../blocks/form/CheckBox";

class BookFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleRadioBtn = this.handleRadioBtn.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:8000/authors").then((res) => res.json()),
      fetch("http://localhost:8000/genres").then((res) => res.json()),
    ]).then(([res1, res2]) => {
      this.setState({
        authorsOptions: res1,
        genreOptions: res2,
      });
    });
  }

  handleInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      (prevState) => {
        return {
          newBook: {
            ...prevState.newBook,
            [name]: value,
          },
        };
      },
      () => console.log(this.state.newBook)
    );
  }

  handleRadioBtn(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      (prevState) => {
        return {
          newBook: {
            ...prevState.newBook,
            [name]: value,
          },
          selectedStatus: value,
        };
      },
      () => console.log(this.state.newBook)
    );
  }

  handleCheckBox(event) {
    event.preventDefault();
    const newSelection = event.target.value;
    const name = event.target.name;
    // const genreNames = this.state.genreOptions.map((genre) => {
    //   return genre.name;
    // });
    console.log("checkbox", this.selectedGenres);

    let newSelectionArray;

    if (this.state.selectedGenres.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedGenres.filter(
        (s) => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedGenres, newSelection];
    }

    this.setState(
      (prevState) => {
        return {
          newBook: {
            ...prevState.newBook,
            [name]: newSelectionArray,
          },
          selectedGenres: [newSelectionArray],
        };
      },
      () => console.log("Selected Genres", this.state.selectedGenres)
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let bookData = this.state.newBook;
    console.log("book data", bookData);
    // const bookdataJson = JSON.stringify(bookData);
    // console.log("bookData Json", bookdataJson);

    fetch("http://localhost:8000/books", {
      method: "POST",
      body: JSON.stringify(bookData),
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
    console.log("authorOptions", this.state.authorsOptions);
    const authors = this.state.authorsOptions.map((author) => {
      return { value: author.id, label: author.name };
    });
    const genres = this.state.genreOptions.map((genre) => {
      return { value: genre.id, label: genre.name };
      // return genre.name;
    });
    console.log("authorslist", authors);
    console.log(genres);

    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        <legend className="form-legend">New Book</legend>
        <Input
          type={"text"}
          title={"Book Title"}
          name={"title"}
          value={this.state.newBook.title}
          placeholder={"Enter the Title"}
          onChange={this.handleInput}
        />
        <Select
          multiple={false}
          title={"Author"}
          name={"author"}
          options={authors}
          value={this.state.newBook.author}
          placeholder={"Select author"}
          onChange={this.handleInput}
        />

        <CheckBox
          title={"Genre"}
          name={"genre"}
          options={genres}
          checked={this.state.selectedGenres}
          onChange={this.handleCheckBox}
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
        />
        <Input
          type={"text"}
          title={"ISBN"}
          name={"isbn"}
          value={this.state.newBook.isbn}
          placeholder={"Book Isbn"}
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

export default BookFormContainer;
