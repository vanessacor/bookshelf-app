export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAllBooks() {
    return fetch(`${this.baseUrl}/books`).then((response) => response.json());
  }

  getBook(id) {
    return fetch(`${this.baseUrl}/books/${id}`).then((response) =>
      response.json()
    );
  }

  getAllAuthors() {
    return fetch(`${this.baseUrl}/authors`).then((response) => response.json());
  }

  getAuthor(id) {
    return fetch(`${this.baseUrl}/authors/${id}`).then((response) =>
      response.json()
    );
  }

  getAllGenres() {
    return fetch(`${this.baseUrl}/genres`).then((response) => response.json());
  }

  deleteBook(id) {
    return fetch(`${this.baseUrl}/books/${id}`, {
      method: "delete",
    });
  }

  createBook(book) {
    return fetch(`${this.baseUrl}/books`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  createAuthor(author) {
    return fetch(`${this.baseUrl}/authors`, {
      method: "POST",
      body: JSON.stringify(author),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
