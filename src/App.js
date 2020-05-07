import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Books from "./components/pages/books/Books";
import BookFormContainer from "./components/pages/books/BookFormContainer";
import BookDetails from "./components/pages/books/BookDetails";
import Authors from "./components/pages/authors/Authors";
import AuthorFormContainer from "./components/pages/authors/AuthorFormContainer";
import Genres from "./components/pages/genres/Genres";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route exact path="/books" component={Books} />

            <Route exact path="/books/create" component={BookFormContainer} />
            <Route path="/books/:id" component={BookDetails} />

            <Route exact path="/authors" component={Authors} />
            <Route path="/authors/create" component={AuthorFormContainer} />
            {/* <Route path="/authors/:id" component={AuthorDetails} /> */}

            <Route path="/genres" component={Genres} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
