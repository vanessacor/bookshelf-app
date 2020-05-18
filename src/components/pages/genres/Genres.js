import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withApiClient } from "../../../services/withApiClient";
import Loader from "../../blocks/Loader";
import GenreItem from "./GenreItem";

class Genres extends Component {
  state = {
    loading: true,
    genres: undefined,
  };

  componentDidMount() {
    const { apiClient } = this.props;
    apiClient.getAllGenres().then((data) => {
      this.setState({
        loading: false,
        genres: data,
      });
      console.log(this.state.genres);
    });
  }

  render() {
    return <div className="Genres">{this.renderContents()}</div>;
  }

  renderContents() {
    const { loading, genres } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (!genres.length) {
      return <div className="emptyList">There are no Genres</div>;
    }
    return this.renderList();
  }

  renderList() {
    const { genres } = this.state;
    const items = genres.map((item) => (
      <GenreItem key={item.id} genre={item} />
    ));
    return (
      <>
        <div className="genre-list">
          <h2>List of Genres:</h2>
          {items}
        </div>

        <button className="button addGenre">
          <Link to={"/genres/create"}>Add Genre</Link>
        </button>
      </>
    );
  }
}

export default withApiClient(Genres);
