import React, { Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <Fragment>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" align="center">
          My Reads
        </Typography>
      </Toolbar>
    </AppBar>
  </Fragment>
);

export default Header;
