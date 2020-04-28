import React from "react";

function BookCard(props) {
  const book = props.book;
  const { title, author, genre, isbn, status, url } = book;

  // const bookGenre = genre.forEach((genre) => {
  //   return <span>{genre.name}</span>;
  // });

  return (
    <section>
      <h2>{title}</h2>
      <h3>Author:</h3>
      <p>{author.name}</p>
      <h3>Genre:</h3>
      <p>
        {genre.map((item) => (
          <span key={item}>{item.name}</span>
        ))}
      </p>
      <h3>Status:</h3>
      <p>{status}</p>
      <h3>ISBN:</h3>
      <p>{isbn}</p>
      <p>{url}</p>
    </section>
  );
}

export default BookCard;
