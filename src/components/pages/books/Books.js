import React from "react";
import { Link } from "react-router-dom";

import BookCard from "./BookCard";
import Loader from "../../blocks/Loader";
import { withApiClient } from "../../../services/withApiClient";

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
        <button className="button addBook">
          <Link to={"/books/create"}>Add Book</Link>
        </button>
      </>
    );
  }
}

export default withApiClient(Books);
