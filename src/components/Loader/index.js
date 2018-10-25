import React from 'react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

const Loader = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
);

Loader.propTypes = {
  classes: propTypes.shape({}).isRequired,
};

export default withStyles(styles)(Loader);
