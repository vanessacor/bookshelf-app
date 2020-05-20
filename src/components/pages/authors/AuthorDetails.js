import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { withApiClient } from "../../../services/withApiClient";
import Loader from "../../blocks/Loader";
import Button from "../../blocks/Button";

class AuthorDetails extends Component {
  state = {
    loading: true,
    author: undefined,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { apiClient } = this.props;
    apiClient.getAuthor(id).then((data) => {
      this.setState({
        loading: false,
        author: data,
      });
    });
  }

  handleDelete = (event) => {
    event.preventDefault();
    console.log("I was clicked");
    const { author } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "./delete",
      state: author,
    });
  };

  render() {
    const { loading, author } = this.state;

    if (loading) {
      return <Loader />;
    }

    const { name, books } = author;
    return (
      <div className="author-details">
        <h2>{name}</h2>
        {this.renderCardDetails(author)}
        {!!books.length ? this.renderBooks() : this.renderNoBooks()}
        <Button
          className={"delete"}
          onClick={this.handleDelete}
          title={"Delete Author"}
        />
      </div>
    );
  }

  renderCardDetails(author) {
    const { dateOfDeath } = author;
    return <div>{dateOfDeath ? this.renderLifeSpan() : this.renderAge()}</div>;
  }

  renderLifeSpan() {
    const { author } = this.state;
    const { dateOfDeath, lifespan } = author;
    return (
      <p>
        Died in <Moment format="MMMM YYYY">{dateOfDeath}</Moment> at the age of{" "}
        {lifespan}
      </p>
    );
  }

  renderAge() {
    const { author } = this.state;
    const { dateOfBirth, lifespan } = author;
    return (
      <div>
        <h3>Age:</h3>
        <p>{lifespan}</p>
        <h3>Date of Birth:</h3>
        <p>
          <Moment format="DD/MM/YYYY">{dateOfBirth}</Moment>
        </p>
      </div>
    );
  }

  renderNoBooks() {
    return (
      <div>
        <h3>Books:</h3>
        <p>This author has no books yet</p>
      </div>
    );
  }

  renderBooks() {
    const { author } = this.state;
    const { books } = author;
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

export default withApiClient(AuthorDetails);
