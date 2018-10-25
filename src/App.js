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

  async componentDidMount() {
    try {
      const response = await BooksAPI.getAll();
      this.setState(() => ({ books: response }));
    } catch (error) {
      throw new Error(error);
    }
  }

  updateBookDetails = async () => {
    this.setState(() => ({ loading: true }));
    try {
      const response = await BooksAPI.getAll();
      this.setState(() => ({
        books: response,
        loading: false,
      }));
    } catch (error) {
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
