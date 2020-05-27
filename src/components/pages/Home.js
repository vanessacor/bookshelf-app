import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../services/withApiClient";

class Home extends Component {
  state = {
    loading: true,
    bookCount: "",
    authorCount: "",
    genreCount: "",
  };

  componentDidMount() {
    const { apiClient } = this.props;

    apiClient.getAllNumbers().then((data) => {
      this.setState({
        loading: false,
        bookCount: data.count.bookCount,
        authorCount: data.count.authorCount,
        genreCount: data.count.genreCount,
      });
    });
  }
  render() {
    const { bookCount, authorCount, genreCount } = this.state;
    return (
      <div className="home">
        <div className="home-information">
          <h3>Information</h3>

          <div className="home-information-count">
            <p>Books:</p>
            <span>{bookCount}</span>
            <p>Authors:</p>
            <span>{authorCount}</span>
            <p>Genres:</p>
            <span>{genreCount}</span>
          </div>
        </div>

        <div className="home-add">
          <button className="button button-add">
            <Link to={"/books/create"}>Add Book</Link>
          </button>
          <button className="button button-add">
            <Link to={"/authors/create"}>Add Author</Link>
          </button>
          <button className="button button-add">
            <Link to={"/genres/create"}>Add Genre</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default withApiClient(Home);
