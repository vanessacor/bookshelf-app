import React from "react";
import { Link } from "react-router-dom";

import { withApiClient } from "../../../services/withApiClient";

import BookCard from "./BookCard";
import Loader from "../../blocks/Loader";

class Books extends React.Component {
  state = {
    loading: true,
    books: undefined,
  };

  componentDidMount() {
    const { apiClient } = this.props;

    apiClient.getAllBooks().then((data) => {
      this.setState({
        loading: false,
        books: data,
      });
    });
  }

  render() {
    return <div className="Books">{this.renderContents()}</div>;
  }

  renderContents() {
    const { loading, books } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (!books.length) {
      return <div className="emptyList"></div>;
    }
    return this.renderList();
  }

  renderList() {
    const { books } = this.state;
    const cards = books.map((item) => {
      return <BookCard key={item.id} book={item} />;
    });
    return (
      <>
        <div className="book-list">{cards}</div>
        <button className="button book-add">
          <Link to={"/books/create"}>Add Book</Link>
        </button>
      </>
    );
  }
}

export default withApiClient(Books);
