import React, { Component } from "react";

class BookDetail extends Component {
  constructor() {
    super();
    this.state = {
      book: "",
    };
  }
  componentDidMount() {
    console.log("props", this.props);
    const id = this.props.match.params.id;
    console.log("id", id);
    fetch(`http://localhost:8000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data });
      });
  }

  render() {
    const book = this.state.book;
    const { title, author, genre, summary, isbn } = book;
    console.log(author);
    return (
      <div className="bookDetails">
        <h2>{title}</h2>
      </div>
    );
  }
}

export default BookDetail;
