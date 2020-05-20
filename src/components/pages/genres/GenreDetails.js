import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../../services/withApiClient";
import Loader from "../../blocks/Loader";
import Button from "../../blocks/Button";

class GenreDetails extends Component {
  state = {
    loading: true,
    genre: undefined,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { apiClient } = this.props;
    apiClient.getGenre(id).then((data) => {
      this.setState({
        loading: false,
        genre: data,
      });
    });
  }

  handleDelete = (event) => {
    event.preventDefault();
    const { genre } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "./delete",
      state: genre,
    });
  };

  render() {
    const { loading, genre } = this.state;

    if (loading) {
      return <Loader />;
    }

    const { name, books } = genre;
    return (
      <div className="details genre-details">
        <h2>{name}</h2>

        {!!books.length ? this.renderBooks() : this.renderNoBooks()}
        <Button
          className={"delete"}
          onClick={this.handleDelete}
          title={"Delete Genre"}
        />
      </div>
    );
  }

  renderNoBooks() {
    return (
      <div>
        <h3>Books:</h3>
        <p>There is no books within this Genre</p>
      </div>
    );
  }

  renderBooks() {
    const { genre } = this.state;
    const { books } = genre;
    return (
      <div>
        <h3>Books:</h3>
        <ul>{books.map((item) => this.renderBookItem(item))}</ul>
      </div>
    );
  }

  renderBookItem(item) {
    return (
      <li key={item.id}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    );
  }
}

export default withApiClient(GenreDetails);
