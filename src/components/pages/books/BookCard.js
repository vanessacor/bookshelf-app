import React from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const { book } = props;
  const { title, author, status, url } = book;

  return (
    <>
      <Link to={`${url}`}>
        <section className="card card-book">
          <h2>{title}</h2>
          <div className="card-details card-details-book">
            {author && (
              <>
                <p>{author.name}</p>
              </>
            )}
          </div>
          <h3 className={status === "Read" ? "book-read" : "book-unread"}>
            {status}
          </h3>
        </section>
      </Link>
    </>
  );
}

export default BookCard;
