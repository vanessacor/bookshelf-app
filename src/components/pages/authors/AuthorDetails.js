import React, { Component } from "react";
import Moment from "react-moment";
import Loader from "../../blocks/Loader";

class AuthorDetails extends Component {
  state = {
    loading: true,
    author: "",
    books: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:8000/authors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          author: data.authorJson,
          books: data.books,
          loading: false,
        });
      });
  }

  render() {
    console.log("render", this.state);
    const { loading } = this.state.loading;

    const { name, dateOfBirth, dateOfDeath, lifespan } = this.state.author;
    console.log("name", name);

    if (loading) {
      return <Loader />;
    }

    return (
      this.state.author && (
        <div className="bookDetails">
          <h2>{name}</h2>
          <div className="author-card-details">
            {dateOfDeath ? (
              <p>
                Died in <Moment format="MMMM YYYY">{dateOfDeath}</Moment> at the
                age of {lifespan}
              </p>
            ) : (
              <div>
                <h3>Age:</h3>
                <p>{lifespan}</p>
                <h3>Date of Birth:</h3>
                <p>
                  <Moment format="DD/MM/YYYY">{dateOfBirth}</Moment>
                </p>
              </div>
            )}
          </div>
          {this.state.books.length <= 0 ? (
            <div>
              <h3>Books:</h3>
              <p>This author has no books yet</p>
            </div>
          ) : (
            <div>
              <h3>Books:</h3>
              <ul>
                {this.state.books.map((item) => (
                  <li key={item.id}> {item.title} </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    );
  }
}

export default AuthorDetails;
