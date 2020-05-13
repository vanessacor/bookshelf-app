import React from "react";
import Button from "../../blocks/Button";
import { withApiClient } from "../../../services/withApiClient";

class BookDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.location.state,
    };
  }

  deleteBook = () => {
    const { id } = this.state.book;
    const { apiClient, history } = this.props;

    apiClient.deleteBook(id).then(() => {
      console.log("book deleted");
      history.push("./");
    });
  };

  returnToBook = () => {
    const { id } = this.state.book;
    const { history } = this.props;
    history.push(`./${id}`);
  };

  render() {
    const { title, id } = this.state.book;
    return (
      <div className="delete">
        <p>Are you sure you want to delete {title} ?</p>
        <Button className={"submit"} onClick={this.deleteBook} title={"Yes"} />
        <Button className={"submit"} onClick={this.returnToBook} title={"No"} />

        <p>{id}</p>
      </div>
    );
  }
}
export default withApiClient(BookDelete);
