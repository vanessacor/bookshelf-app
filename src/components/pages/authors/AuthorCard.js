import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function AuthorCard(props) {
  const author = props.author;
  const { name, dateOfDeath, lifespan, url } = author;

  return (
    <section className="author-card">
      <h2>
        <Link to={`${url}`}>{name}</Link>
      </h2>
      <div className="author-card-details">
        {dateOfDeath ? (
          <p>
            Died in <Moment format="DD/MM/YYYY">{dateOfDeath}</Moment> at the
            age of {lifespan}
          </p>
        ) : (
          <p>{lifespan} years old</p>
        )}
      </div>
    </section>
  );
}

export default AuthorCard;
