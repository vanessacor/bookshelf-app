import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";

import Books from "./components/pages/books/Books";
import BookCreate from "./components/pages/books/BookCreate";
import BookEdit from "./components/pages/books/BookEdit";
import BookDetails from "./components/pages/books/BookDetails";
import BookDelete from "./components/pages/books/BookDelete";

import Authors from "./components/pages/authors/Authors";
import AuthorCreate from "./components/pages/authors/AuthorCreate";
import AuthorEdit from "./components/pages/authors/AuthorEdit";
import AuthorDetails from "./components/pages/authors/AuthorDetails";
import AuthorDelete from "./components/pages/authors/AuthorDelete";

import Genres from "./components/pages/genres/Genres";
import GenreFormContainer from "./components/pages/genres/GenreFormContainer";
import GenreDelete from "./components/pages/genres/GenreDelete";
import GenreDetails from "./components/pages/genres/GenreDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/books" component={Books} />

            <Route path="/books/create" component={BookCreate} />
            <Route path="/books/edit" component={BookEdit} />
            <Route path="/books/delete" component={BookDelete} />
            <Route path="/books/:id" component={BookDetails} />

            <Route exact path="/authors" component={Authors} />
            <Route path="/authors/create" component={AuthorCreate} />
            <Route path="/authors/edit" component={AuthorEdit} />
            <Route path="/authors/delete" component={AuthorDelete} />
            <Route path="/authors/:id" component={AuthorDetails} />

            <Route exact path="/genres" component={Genres} />
            <Route path="/genres/create" component={GenreFormContainer} />
            <Route path="/genres/delete" component={GenreDelete} />
            <Route path="/genres/:id" component={GenreDetails} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
