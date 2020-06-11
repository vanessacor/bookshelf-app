import React from "react";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";

class BookDelete extends React.Component {
  constructor(props) {
    super(props);
    //if not location state redirect
    this.book = this.props.location.state.book;
  }

  deleteBook = () => {
    const { id } = this.book;
    const { apiClient, history } = this.props;
    if (!this.book) {
      history.push("./");
    }
    apiClient.deleteBook(id).then(() => {
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
        <div className="delete delete-book">
          <h2>Delete Book</h2>
          <h3>
            {title} <span> by {author.name}</span>
          </h3>

          <p>Are you sure you want to delete this book ?</p>
          <Button
            className={"button-delete"}
            onClick={this.deleteBook}
            title={"Yes"}
          />
          <Button
            className={"button-delete-cancel"}
            onClick={this.returnToBook}
            title={"No"}
          />
        </div>
      );
    }
  }
}
export default withApiClient(BookDelete);
