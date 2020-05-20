import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withApiClient } from "../../../services/withApiClient";

import Button from "../../blocks/Button";

class GenreDelete extends Component {
  constructor(props) {
    super(props);
    this.genre = this.props.location.state;
  }

  deleteGenre = () => {
    const { id, books } = this.genre;
    console.log("I was clicked", this.genre);
    const { apiClient, history } = this.props;
    if (!this.genre) {
      history.push("./");
    }
    if (books.length) {
      return;
    } else
      apiClient.deleteGenre(id).then(() => {
        console.log("genre deleted");
        history.push("./");
      });
  };

  returnToGenres = () => {
    const { history } = this.props;
    history.push("./");
  };

  render() {
    console.log("this genre", this.genre);
    return <div className="delete delete-genre">{this.renderContents()}</div>;
  }

  renderBooks = () => {
    const { name, books } = this.genre;
    return (
      <div className="delete delete-warning">
        <h2>
          {name} <span> is clasiffied the following books:</span>
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
    const { name, books } = this.genre;
    console.log(books);
    if (!this.genre) {
      this.props.history.push("./");
    }
    if (books.length >= 1) {
      return this.renderBooks();
    } else {
      return (
        <div>
          <h3>{name}</h3>

          <h2>Are you sure you want to delete this genre ?</h2>
          <Button
            className={"button-delete"}
            onClick={this.deleteGenre}
            title={"Yes"}
          />
          <Button
            className={"button-delete-cancel"}
            onClick={this.returnToGenres}
            title={"No"}
          />
        </div>
      );
    }
  }
}
export default withApiClient(GenreDelete);
