import React from "react";
import BookCard from "./BookCard";
import AddBookBtn from "./AddBookBtn";

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      bookList: [],
      showListOfBooks: true,
      showAddForm: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/books")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bookList: data });
      });
  }

  handleClick(event) {
    event.preventDefault();
    console.log("this btn was clicked");
    this.setState({
      showAddForm: true,
      showListOfBooks: false,
    });
  }

  render() {
    const books = this.state.bookList.map((item) => (
      <BookCard key={item.id} book={item} />
    ));
    return (
      <div>
        {this.state.showListOfBooks && <div className="book-list">{books}</div>}
        <AddBookBtn
          showForm={this.state.showAddForm}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Books;
