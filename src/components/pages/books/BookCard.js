import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../../services/withApiClient";
import depopulate from "../../../services/utils/depopulate";

import Button from "../../blocks/Button";

class BookCard extends Component {
  constructor(props) {
    super(props);
    const book = props.book;
    this.state = {
      updating: false,
      book: { ...book },
    };
  }

  updateBook(book) {
    const depopulated = depopulate(this.state.book);
    depopulated.status = book.status === "Read" ? "Unread" : "Read";
    const { apiClient } = this.props;
    return apiClient.updateBook(depopulated).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        this.setState({ unexpectedError: true });
      }
    });
  }

  toggleStatus = () => {
    this.setState({ updating: true });

    const { book } = this.state;
    this.updateBook(book).then((updatedBook) => {
      this.setState({
        updating: false,
        book: {
          ...book,
          status: updatedBook.status,
        },
      });
    });
  };

  render() {
    const { book, updating } = this.state;
    const { title, author, status, url } = book;
    return (
      <section className="card card-book">
        <Link to={url}>
          <h2>{title}</h2>
          <div className="card-details card-details-book">
            {author && (
              <>
                <p>{author.name}</p>
              </>
            )}
          </div>
        </Link>

        <Button
          disabled={updating}
          className={status === "Read" ? "book-read" : "book-unread"}
          onClick={this.toggleStatus}
          title={status}
        />
      </section>
    );
  }
}

export default withApiClient(BookCard);
