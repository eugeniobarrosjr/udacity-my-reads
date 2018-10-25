import React from 'react';
import propTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import BookCard from '../BookCard';

import styles from './styles';

const BookShelf = ({
  classes, typeOfShelf, books, updateBookDetails, title,
}) => (
  <div className={classes.container}>
    <Typography className={classes.title} variant="h4" color="textPrimary">
      {title}
    </Typography>
    <div className={classes.booksContainer}>
      {books.map(
        book => book.shelf === typeOfShelf && (
        <BookCard key={book.id} book={book} updateBookDetails={updateBookDetails} />
        ),
      )}
    </div>
  </div>
);

BookShelf.propTypes = {
  classes: propTypes.shape({}).isRequired,
  typeOfShelf: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  books: propTypes.arrayOf(
    propTypes.shape({
      book: propTypes.object,
    }),
  ).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default withStyles(styles)(BookShelf);
