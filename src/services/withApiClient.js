import React from "react";

import { ApiClient } from "./apiClient";

// const apiClient = new ApiClient("https://pure-garden-69207.herokuapp.com");

const apiClient = new ApiClient("http://localhost:8000");

export const withApiClient = (Component) => {
  return (props) => <Component apiClient={apiClient} {...props} />;
};
