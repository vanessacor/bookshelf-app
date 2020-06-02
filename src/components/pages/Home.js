import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../services/withApiClient";

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

        <div className="toggle-menu">
          <button onClick={this.showAddMenu} className="toggle-menu-button">
            <ion-icon name="add-outline"></ion-icon>
          </button>
          {toggled && (
            <div className="toggle-menu-list">
              <button className="toggle-menu-list-item">
                <Link to={"/books/create"}>
                  <ion-icon name="book-outline"></ion-icon>
                </Link>
              </button>
              <button className="toggle-menu-list-item">
                <Link to={"/authors/create"}>
                  <ion-icon name="person-outline"></ion-icon>
                </Link>
              </button>
              <button className="toggle-menu-list-item">
                <Link to={"/genres/create"}>
                  <ion-icon name="pricetag-outline"></ion-icon>
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withApiClient(Home);
