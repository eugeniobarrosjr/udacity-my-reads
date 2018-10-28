import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import BookShelf from '../../components/BookShelf';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';

const Main = ({ books, updateBookDetails }) => (
  <Fragment>
    <Header />
    <BookShelf
      books={books.filter(book => book.shelf === 'currentlyReading')}
      title="Currently Reading"
      updateBookDetails={updateBookDetails}
    />
    <BookShelf
      books={books.filter(book => book.shelf === 'wantToRead')}
      title="Want to Read"
      updateBookDetails={updateBookDetails}
    />
    <BookShelf
      title="Read"
      books={books.filter(book => book.shelf === 'read')}
      updateBookDetails={updateBookDetails}
    />
    <FloatingButton />
  </Fragment>
);

Main.propTypes = {
  books: propTypes.arrayOf(
    propTypes.shape({
      book: propTypes.object,
    }),
  ).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default Main;
