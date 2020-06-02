import React, { Component } from "react";

import AuthorCard from "./AuthorCard";
import Loader from "../../blocks/Loader";
import AddFab from "../../blocks/AddFab";

import { withApiClient } from "../../../services/withApiClient";

class Authors extends Component {
  state = {
    loading: true,
    authors: undefined,
  };

  componentDidMount() {
    const { apiClient } = this.props;
    apiClient.getAllAuthors().then((data) => {
      this.setState({
        loading: false,
        authors: data,
      });
    });
  }

  render() {
    return <div className="Authors">{this.renderContents()}</div>;
  }

  renderContents() {
    const { loading, authors } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (!authors.length) {
      return <div className="emptyList"></div>;
    }
    return this.renderList();
  }

  renderList() {
    const { authors } = this.state;
    const cards = authors.map((item) => (
      <AuthorCard key={item.id} author={item} />
    ));
    return (
      <>
        <div className="author-list">{cards}</div>
        <AddFab link={"/authors/create"} className={"author"} />
      </>
    );
  }
}

export default withApiClient(Authors);
