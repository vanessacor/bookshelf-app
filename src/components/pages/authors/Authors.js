import React from "react";

import { Link } from "react-router-dom";

import AuthorCard from "./AuthorCard";
import AuthorFormContainer from "./AuthorFormContainer";
import Loader from "../../blocks/Loader";

class Authors extends React.Component {
  state = {
    loading: true,
    authors: undefined,
    showList: true,
    showForm: false,
  };

  componentDidMount() {
    fetch("http://localhost:8000/authors")
      .then((response) => response.json())
      .then((data) => {
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
    const { authors, showList, showForm } = this.state;
    const cards = authors.map((item) => (
      <AuthorCard key={item.id} author={item} />
    ));
    return (
      <>
        {showList && <div className="author-list">{cards}</div>}
        {!showForm && (
          <button className="button addAuthor">
            <Link to={"/authors/create"}>Add Author</Link>
          </button>
        )}
        {showForm && <AuthorFormContainer />}
      </>
    );
  }
}

export default Authors;
