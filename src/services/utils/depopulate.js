function depopulate(props) {
  const { id, title, author, genre, status, summary, isbn } = props;
  const authorId = author.id;
  const genreIds = genre.map((genre) => genre.id);

  return {
    id,
    title,
    author: authorId,
    genre: genreIds,
    status,
    summary,
    isbn,
  };
}

export default depopulate;
