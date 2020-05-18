import React from "react";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";

class BookDelete extends React.Component {
  constructor(props) {
    super(props);
    this.book = this.props.location.state;
  }

  deleteBook = () => {
    const { id } = this.book;
    const { apiClient, history } = this.props;
    if (!this.book) {
      history.push("./");
    }
    apiClient.deleteBook(id).then(() => {
      console.log("book deleted");
      history.push("./");
    });
  };

  returnToBook = () => {
    const { id } = this.book;
    const { history } = this.props;
    history.push(`./${id}`);
  };

  render() {
    return <div className="Books">{this.renderContents()}</div>;
  }

  renderContents() {
    if (!this.book) {
      this.props.history.push("./");
    } else {
      const { title, author } = this.book;
      return (
        <div className="delete-book">
          <h3>
            {title} <span> by {author.name}</span>
          </h3>

          <h2>Are you sure you want to delete this book ?</h2>
          <Button
            className={"delete-book-btn"}
            onClick={this.deleteBook}
            title={"Yes"}
          />
          <Button
            className={"delete-book-cancel-btn"}
            onClick={this.returnToBook}
            title={"No"}
          />
        </div>
      );
    }
  }
}
export default withApiClient(BookDelete);
