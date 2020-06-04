import React, { Component } from "react";

import { withApiClient } from "../../../services/withApiClient";
import HomeMobileMenu from "./HomeMobileMenu";
import HomeDesktopMenu from "./HomeDesktopMenu";

class Home extends Component {
  state = {
    loading: true,
    bookCount: "",
    authorCount: "",
    genreCount: "",
    booksRead: "",
    booksUnread: "",
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
        booksRead: data.count.bookReadCount,
        booksUnread: data.count.bookUnreadCount,
      });
    });
  }

  showAddMenu = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    const {
      bookCount,
      authorCount,
      genreCount,
      booksRead,
      booksUnread,
      toggled,
    } = this.state;
    return (
      <div className="home">
        <HomeDesktopMenu toggled={toggled} onClick={this.showAddMenu} />
        <div className="home-information">
          <h3>Information</h3>

          <div className="home-information-count">
            <p>Books:</p>
            <span>{bookCount}</span>
            <p>Books Read:</p>
            <span>{booksRead}</span>
            <p>Books Unread:</p>
            <span>{booksUnread}</span>
            <p>Authors:</p>
            <span>{authorCount}</span>
            <p>Genres:</p>
            <span>{genreCount}</span>
          </div>
        </div>

        <HomeMobileMenu toggled={toggled} onClick={this.showAddMenu} />
      </div>
    );
  }
}

export default withApiClient(Home);
