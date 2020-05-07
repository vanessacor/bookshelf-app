import React from "react";
import { Link } from "react-router-dom";

function AuthorCard(props) {
  const author = props.author;
  const { name, lifespan, url } = author;

  return (
    <section className="book-card">
      <h2>
        <Link to={`${url}`}>{name}</Link>
      </h2>
      <div className="author-card-details">
        <h3>Lifespan:</h3>
        <p>{lifespan}</p>
        {/* <h3>Books:</h3>
        <p>
          {books.map((item) => (
            <span key={item.id}>{item.title} </span>
          ))}
        </p> */}
        <h3>URL:</h3>
        <p>{url}</p>
      </div>
    </section>
  );
}

export default AuthorCard;
