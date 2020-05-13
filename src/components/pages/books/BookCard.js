import React from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const { book } = props;
  const { title, author, genre, isbn, status, url } = book;

  return (
    <section className="card card-book">
      <h2>
        <Link to={`${url}`}>{title}</Link>
      </h2>
      <div className="card-details card-details-book">
        {author && (
          <>
            <h3>Author:</h3>
            <p>
              <Link to={`${author.url}`}> {author.name} </Link>
            </p>
          </>
        )}
        <h3>Genre:</h3>
        <p>
          {genre.map((item) => (
            <span key={item.id}>{item.name} </span>
          ))}
        </p>
        <h3>Status:</h3>
        <p>{status}</p>
        <h3>ISBN:</h3>
        <p>{isbn}</p>
      </div>
    </section>
  );
}

export default BookCard;
