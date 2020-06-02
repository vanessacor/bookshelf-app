import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function AuthorCard(props) {
  const author = props.author;
  const { name, dateOfDeath, lifespan, url } = author;

  function showDateOfDeath() {
    return (
      <p>
        Died in <Moment format="DD/MM/YYYY">{dateOfDeath}</Moment> at the age of{" "}
        {lifespan}
      </p>
    );
  }

  function showAge() {
    return <p>{lifespan} years old</p>;
  }

  return (
    <>
      <Link to={`${url}`}>
        <section className="card card-author">
          <h2>{name}</h2>
          <div className="card-details card-details-author">
            {dateOfDeath ? showDateOfDeath() : showAge()}
          </div>
        </section>
      </Link>
    </>
  );
}

export default AuthorCard;
