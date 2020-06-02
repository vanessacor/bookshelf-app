import React, { Component } from "react";

import { withApiClient } from "../../../services/withApiClient";
import Loader from "../../blocks/Loader";
import GenreItem from "./GenreItem";
import AddFab from "../../blocks/AddFab";

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
    });
  }

  render() {
    return <div className="genres">{this.renderContents()}</div>;
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
        <AddFab link={"/genres/create"} className={"genre"} />
        <div className="genre-list">
          <h2>List of Genres:</h2>
          {items}
        </div>
      </>
    );
  }
}

export default withApiClient(Genres);
