import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import styles from './styles';

const FloatingButton = ({ classes }) => (
  <Link to="/search">
    <Button variant="fab" color="secondary" className={classes.fab}>
      <AddIcon />
    </Button>
  </Link>
);

FloatingButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(FloatingButton);
