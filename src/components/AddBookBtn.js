import React from "react";
import BookFormContainer from "./book-form/BookFormContainer";

function AddBookBtn(props) {
  const { showForm, onClick } = props;

  return (
    <div>
      <button onClick={onClick}>Add a Book</button>
      {showForm && <BookFormContainer />}
    </div>
  );
}

export default AddBookBtn;
