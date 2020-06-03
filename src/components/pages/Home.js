import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../services/withApiClient";
import HomeMobileMenu from "../blocks/HomeMobileMenu";
import HomeDesktopMenu from "../blocks/HomeDesktopMenu";

class Home extends Component {
  state = {
    loading: true,
    bookCount: "",
    authorCount: "",
    genreCount: "",
    toggled: false,
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

  showAddMenu = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    const { bookCount, authorCount, genreCount, toggled } = this.state;
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

        <HomeDesktopMenu toggled={toggled} onClick={this.showAddMenu} />

        <HomeMobileMenu toggled={toggled} onClick={this.showAddMenu} />
      </div>
    );
  }
}

export default withApiClient(Home);
