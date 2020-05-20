import React, { Component } from "react";
import { Link } from "react-router-dom";

import Loader from "../../blocks/Loader";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";

class BookDetail extends Component {
  state = {
    loading: true,
    book: undefined,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { apiClient } = this.props;
    apiClient.getBook(id).then((data) => {
      this.setState({
        loading: false,
        book: data,
      });
    });
  }

  handleDelete = (event) => {
    event.preventDefault();
    console.log("I was clicked");
    const { book } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "./delete",
      state: book,
    });
  };

  render() {
    const { loading, book } = this.state;

    if (loading) {
      return <Loader />;
    }

    const { title, author, summary, genre, isbn, status } = book;
    return (
      <div>
        <div className="book-details">
          <h2>{title}</h2>
          {author && (
            <>
              <h3>Author:</h3>
              <p>
                <Link to={`${author.url}`}> {author.name} </Link>
              </p>
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
          <Button
            className={"delete"}
            onClick={this.handleDelete}
            title={"Delete Book"}
          />
        </div>
        <button className="button addBook">
          <Link to={"/books/create"}>Add Book</Link>
        </button>
      </div>
    );
  }
}

export default withApiClient(BookDetail);
