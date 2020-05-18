import React from "react";

function ErrorBanner(props) {
  let { children } = props;
  if (!children) {
    children = "Unexpected error. Please try again";
  }
  return <div className="error">{children}</div>;
}
export default ErrorBanner;
