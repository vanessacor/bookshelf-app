import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Books from "./components/pages/books/Books";
import Authors from "./components/pages/authors/Authors";
import Genres from "./components/pages/genres/Genres";
import App from "./App";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <App />
    <Switch>
      <Route path="/books">
        <Books />
      </Route>
      <Route path="/authors">
        <Authors />
      </Route>
      <Route path="/genres">
        <Genres />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
