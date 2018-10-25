import React from 'react';
import propTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Search from './pages/Search';

const Routes = ({ books, updateBookDetails }) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/`}
        render={() => <Main books={books} updateBookDetails={updateBookDetails} />}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/search`}
        render={() => <Search updateBookDetails={updateBookDetails} />}
      />
    </Switch>
  </BrowserRouter>
);

Routes.propTypes = {
  books: propTypes.arrayOf(
    propTypes.shape({
      book: propTypes.object,
    }),
  ).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default Routes;
