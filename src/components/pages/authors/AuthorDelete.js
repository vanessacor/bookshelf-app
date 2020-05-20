import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withApiClient } from "../../../services/withApiClient";

import Button from "../../blocks/Button";

class AuthorDelete extends Component {
  constructor(props) {
    super(props);
    this.author = this.props.location.state;
  }

  deleteAuthor = () => {
    const { id, books } = this.author;
    console.log("I was clicked", this.author);
    const { apiClient, history } = this.props;
    if (!this.author) {
      history.push("./");
    }
    if (books.length) {
      return;
    } else
      apiClient.deleteAuthor(id).then(() => {
        console.log("author deleted");
        history.push("./");
      });
  };

  returnToAuthor = () => {
    const { id } = this.author;
    const { history } = this.props;
    history.push(`./${id}`);
  };

  render() {
    return <div className="delete-author">{this.renderContents()}</div>;
  }

  renderBooks = () => {
    const { name, books } = this.author;
    return (
      <div className="delete-author-warning">
        <h2>
          {name} <span> wrote the following books:</span>
        </h2>

        <p>Please delete these books first</p>
        <ul>{books.map((item) => this.renderBookItem(item))}</ul>
      </div>
    );
  };

  renderBookItem = (item) => {
    return (
      <li key={item.id}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    );
  };

  renderContents() {
    const { name, books } = this.author;
    console.log(books);
    if (!this.author) {
      this.props.history.push("./");
    }
    if (books.length >= 1) {
      return this.renderBooks();
    } else {
      return (
        <div>
          <h3>{name}</h3>

          <h2>Are you sure you want to delete this author ?</h2>
          <Button
            className={"delete-author-btn"}
            onClick={this.deleteAuthor}
            title={"Yes"}
          />
          <Button
            className={"delete-author-cancel-btn"}
            onClick={this.returnToAuthor}
            title={"No"}
          />
        </div>
      );
    }
  }
}
export default withApiClient(AuthorDelete);
