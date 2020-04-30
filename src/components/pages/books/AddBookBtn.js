import React from "react";
import BookFormContainer from "./BookFormContainer";

function AddBookBtn(props) {
  const { showForm, onClick } = props;

  return (
    <div>
      <button className="button-add-element" onClick={onClick}>
        Add a Book
      </button>
      {showForm && <BookFormContainer />}
    </div>
  );
}

export default AddBookBtn;
