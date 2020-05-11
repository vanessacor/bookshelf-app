# Bookshelf App

This is my first React App, a bookshelf following [this my other project](https://pacific-hamlet-13856.herokuapp.com/).

## Getting Started

```
npm install
npm start
```

## Description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## todo

- cleanup:

  - check for the need fo defensive checks
  - destructure props and state everyhwere
  - break big render methods in smaller (especially where there is conditional rendering)
  - export withApiClient(BookDetails) -> this.props.apiClient.getBookById(id).then...

- frontend validate book create
  - setState({submitted: true})
  - if !author || !genre.length ... { save }
  - {submitted && !author <ValidationFeedback>Author is Required</ValidationFeedback>}
- fix book form checkboxes
- fix author form (same as book with check status 201, error or redirect)
- create Genre pages
