import React, { Component, Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from './components/Loader';
import Routes from './routes';

import * as BooksAPI from './services/BooksAPI';

export default class App extends Component {
  state = {
    books: [],
    loading: false,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    this.setState(() => ({ loading: true }));
    try {
      const response = await BooksAPI.getAll();
      console.log(response);
      this.setState(() => ({
        books: response,
        loading: false,
      }));
    } catch (error) {
      this.setState(() => ({ loading: false }));
      throw new Error(error);
    }
  };

  updateBookDetails = async (book, shelf) => {
    this.setState(() => ({ loading: true }));
    try {
      await BooksAPI.update(book, shelf);
      this.getAllBooks();
    } catch (error) {
      this.setState(() => ({ loading: false }));
      throw new Error(error);
    }
  };

  render() {
    const { books, loading } = this.state;

    return (
      <Fragment>
        {loading && <Loader />}
        <CssBaseline />
        <Routes books={books} updateBookDetails={this.updateBookDetails} />
      </Fragment>
    );
  }
}
