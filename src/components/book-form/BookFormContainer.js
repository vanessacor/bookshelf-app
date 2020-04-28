import React from "react";
import Input from "./Input";
import Select from "./Select";
import RadioButton from "./RadioButton";
import Button from "./Button";

class BookFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBook: {
        title: "",
        author: "",
        genre: [],
        status: "",
        summary: "",
        isbn: "",
      },
      authorsOptions: [],
      genreOptions: [],
      selectedStatus: "Read",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleRadioBtn = this.handleRadioBtn.bind(this);
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

  handleFormSubmit(event) {
    event.preventDefault();
    let bookData = this.state.newBook;

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
    const authorNames = this.state.authorsOptions.map((author) => {
      return author.name;
    });
    const genreNames = this.state.genreOptions.map((genre) => {
      return genre.name;
    });
    console.log(authorNames);
    console.log(genreNames);

    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
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
          options={authorNames}
          value={this.state.newBook.author}
          placeholder={"Select author"}
          onChange={this.handleInput}
        />
        <Select
          type={"select-multiple"}
          multiple={true}
          title={"Genre"}
          name={"genre"}
          options={genreNames}
          value={[this.state.newBook.genre]}
          placeholder={"Select genre"}
          onChange={this.handleInput}
        />
        <RadioButton
          name={"status"}
          id={"Read"}
          isSelected={this.state.status === "Read"}
          value={this.state.newBook.status}
          label={"Read"}
          onChange={this.handleRadioBtn}
        />
        <RadioButton
          name={"status"}
          id={"Unread"}
          isSelected={this.state.status === "Unread"}
          value={this.state.newBook.status}
          label={"Unread"}
          onChange={this.handleRadioBtn}
        />
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
          className={"button-submit"}
          onClick={this.handleFormSubmit}
          title={"Add"}
        />
      </form>
    );
  }
}

export default BookFormContainer;
