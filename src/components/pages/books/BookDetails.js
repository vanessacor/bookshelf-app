import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../../services/withApiClient";
import Loader from "../../blocks/Loader";
import Button from "../../blocks/Button";
import AddFab from "../../blocks/AddFab";

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
    const { book } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "./delete",
      state: { book },
    });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const { book } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "./edit",
      state: { book },
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
        <div className="details details-book">
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
            className={"button-edit"}
            onClick={this.handleEdit}
            title={"Edit"}
          />
          <Button
            className={"button-delete"}
            onClick={this.handleDelete}
            title={"Delete"}
          />
        </div>
        <AddFab link={"/books/create"} className={"book"} />
      </div>
    );
  }
}

export default withApiClient(BookDetail);
