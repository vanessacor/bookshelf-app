import React from "react";
import { Link } from "react-router-dom";

import BookCard from "./BookCard";
import BookFormContainer from "./BookFormContainer";
import Loader from "../../blocks/Loader";

class Books extends React.Component {
  state = {
    loading: true,
    books: undefined,
    showList: true,
    showForm: false,
  };

  componentDidMount() {
    fetch("http://localhost:8000/books")
      .then((response) => response.json())
      .then((data) => {
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
    const { books, showList, showForm } = this.state;
    const cards = books.map((item) => <BookCard key={item.id} book={item} />);
    return (
      <>
        {showList && <div className="book-list">{cards}</div>}
        {!showForm && (
          <button className="button addBook">
            <Link to={"/books/create"}>Add Book</Link>
          </button>
        )}
        {showForm && <BookFormContainer />}
      </>
    );
  }
}

export default Books;
