import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import Header from '../../components/Header';

const Main = ({ books, updateBookDetails }) => (
  <Fragment>
    <Header />
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
