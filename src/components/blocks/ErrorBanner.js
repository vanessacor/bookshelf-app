import React from "react";

function ErrorBanner(props) {
  let { message } = props;
  if (!message) {
    message = "Unexpected error. Please try again";
  }
  return <div className="error">{message}</div>;
}
export default ErrorBanner;
