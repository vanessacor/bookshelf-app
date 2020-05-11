export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAllBooks() {
    return fetch(`${this.baseUrl}/books`).then((response) => response.json());
  }

  getAllAuthors() {
    return fetch(`${this.baseUrl}/authors`).then((response) => response.json());
  }

  getAllGenres() {
    return fetch(`${this.baseUrl}/genres`).then((response) => response.json());
  }

  createBook(book) {
    return fetch("http://localhost:8000/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
