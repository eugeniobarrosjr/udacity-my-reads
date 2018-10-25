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
    searchingBooks: [],
    loading: false,
    bookFound: true,
  };

  searchingBooks = {};

  async componentDidMount() {
    try {
      const response = await BooksAPI.getAll();
      this.setState(() => ({ books: response }));
    } catch (error) {
      throw new Error(error);
    }
  }

  searchQuery = async (e) => {
    const { books } = this.state;
    if (e.target.value === 'undefined' || e.target.value === '') {
      this.setState(() => ({
        searchingBooks: [],
        loading: false,
      }));
    } else {
      const match = new RegExp(escapeRegExp(e.target.value), 'i');
      if (match.test(e.target.value)) {
        try {
          this.setState(() => ({ loading: true, bookFound: true }));
          const response = await BooksAPI.search(e.target.value);
          if (Array.isArray(response)) {
            this.searchingBooks = response;
            if (this.searchingBooks !== undefined && this.searchingBooks instanceof Array) {
              this.searchingBooks.forEach((searchingBook) => {
                books.forEach((book) => {
                  if (searchingBook.id === book.id) {
                    searchingBook.shelf = book.shelf;
                  } else {
                    searchingBook.shelf = 'none';
                  }
                });
              });
              this.setState({
                searchingBooks: this.searchingBooks,
                loading: false,
              });
            }
          } else {
            this.setState(() => ({ loading: false, bookFound: false, searchingBooks: [] }));
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  };

  render() {
    const { classes, updateBookDetails } = this.props;
    const { searchingBooks, loading, bookFound } = this.state;

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
                  onChange={this.searchQuery}
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
          {searchingBooks.map(book => (
            <BookCard key={book.id} book={book} updateBookDetails={updateBookDetails} />
          ))}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: propTypes.shape({}).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default withStyles(styles)(Search);
