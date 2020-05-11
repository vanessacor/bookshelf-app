import React from "react";

function ValidationFeedback(props) {
  const message = props;
  return <p className="form-validation-message">{message}</p>;
}
export default ValidationFeedback;
