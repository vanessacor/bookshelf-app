import React from "react";

import { ApiClient } from "./apiClient";

const apiClient = new ApiClient("http://localhost:8000");

export const withApiClient = (Component) => {
  return (props) => <Component apiClient={apiClient} {...props} />;
};
