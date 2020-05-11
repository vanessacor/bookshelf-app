import React, { Component } from "react";
import Loader from "../../blocks/Loader";

class BookDetail extends Component {
  state = {
    loading: true,
    book: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:8000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          book: data,
        });
      });
  }

  render() {
    const { loading } = this.state.loading;

    const { title, author, summary, genre, isbn, status } = this.state.book;

    if (loading) {
      return <Loader />;
    }

    return (
      this.state.book && (
        <div className="bookDetails">
          <h2>{title}</h2>
          {author && (
            <>
              <h3>Author:</h3>
              <p>{author.name}</p>
            </>
          )}
          <h3>Summary:</h3>
          <p>{summary}</p>
          <h3>Genres:</h3>
          <p>
            {genre.map((item) => (
              <span key={item.id}>{item.name} </span>
            ))}
          </p>
          <h3>ISBN:</h3>
          <p>{isbn}</p>
          <h3>Status:</h3>
          <p>{status}</p>
        </div>
      )
    );
  }
}

export default BookDetail;
