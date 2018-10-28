import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';

import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Typography, Toolbar, IconButton, InputBase,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';

import * as BooksAPI from '../../services/BooksAPI';
import styles from './styles';

class Search extends Component {
  state = {
    books: [],
    bookFound: null,
    loading: false,
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState(() => ({ bookFound: null }));
    this.searchQuery(value);
  };

  handleBookShelf = (searchBooks) => {
    const { books } = this.props;
    return searchBooks.map(searchBook => ({
      ...searchBook,
      shelf: books.find(b => b.id === searchBook.id) ? b.shelf : 'none',
    }));
  };

  searchQuery = async (value) => {
    if (value === 'undefined' || value === '') {
      this.setState(() => ({
        books: [],
      }));
    } else {
      const match = new RegExp(escapeRegExp(value), 'i');
      if (match.test(value)) {
        try {
          this.setState(() => ({ loading: true }));
          const response = await BooksAPI.search(value);
          if (Array.isArray(response) && response.length > 0) {
            const updatedBooks = this.handleBookShelf(response);
            this.setState(() => ({ books: updatedBooks, loading: false, bookFound: true }));
          } else {
            this.setState(() => ({ loading: false, bookFound: false, books: [] }));
          }
        } catch (error) {
          this.setState(() => ({ loading: false, bookFound: false, books: [] }));
          throw new Error(error);
        }
      }
    }
  };

  render() {
    const { classes, updateBookDetails } = this.props;
    const { books, loading, bookFound } = this.state;

    return (
      <div className={classes.root}>
        {loading && <Loader />}
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton
                className={classes.arrowBackButton}
                color="inherit"
                aria-label="Open drawer"
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              My Reads
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Debounce time="400" handler="onChange">
                <InputBase
                  placeholder="Search…"
                  onChange={this.handleChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </Debounce>
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <div className={classes.booksContainer}>
          {bookFound === false && (
            <Typography
              variant="h5"
              align="center"
              color="textPrimary"
              className={classes.subtitle}
            >
              No results found
            </Typography>
          )}
          {books.map(book => (
            <BookCard key={book.id} book={book} updateBookDetails={updateBookDetails} />
          ))}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: propTypes.shape({}).isRequired,
  books: propTypes.arrayOf(
    propTypes.shape({
      book: propTypes.object,
    }),
  ).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default withStyles(styles)(Search);
