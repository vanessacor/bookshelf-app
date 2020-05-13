import React from "react";

import { Link } from "react-router-dom";

import AuthorCard from "./AuthorCard";
import Loader from "../../blocks/Loader";
import { withApiClient } from "../../../services/withApiClient";

class Authors extends React.Component {
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

        <button className="button addAuthor">
          <Link to={"/authors/create"}>Add Author</Link>
        </button>
      </>
    );
  }
}

export default withApiClient(Authors);
