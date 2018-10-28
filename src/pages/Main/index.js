import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import BookShelf from '../../components/BookShelf';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';

const shelfs = [
  { shelf: 'currentlyReading', title: 'Currently Reading' },
  { shelf: 'wantToRead', title: 'Want to Read' },
  { shelf: 'read', title: 'Read' },
];

const Main = ({ books, updateBookDetails }) => (
  <Fragment>
    <Header />
    {shelfs.map(({ shelf, title }) => (
      <BookShelf
        key={shelf}
        books={books.filter(book => book.shelf === shelf)}
        title={title}
        updateBookDetails={updateBookDetails}
      />
    ))}
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
