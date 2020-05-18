import React from "react";
import { Link } from "react-router-dom";

function GenreItem(props) {
  const item = props.genre;
  const { url, name } = item;
  console.log(item);
  return (
    <section className="genre-item">
      <h3>
        <Link to={`${url}`}>{name}</Link>
      </h3>
    </section>
  );
}

export default GenreItem;
