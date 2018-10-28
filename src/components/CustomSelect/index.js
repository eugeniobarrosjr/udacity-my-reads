import React, { Component } from 'react';
import propTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  FormControl, Select, InputLabel, MenuItem,
} from '@material-ui/core';

import styles from './styles';

class CustomSelect extends Component {
  static propTypes = {
    book: propTypes.shape({
      shelf: propTypes.string,
    }).isRequired,
    classes: propTypes.shape({}).isRequired,
    updateBookDetails: propTypes.func.isRequired,
  };

  state = {
    shelf: 'none',
  };

  componentDidMount() {
    const { book } = this.props;
    this.setState(() => ({ shelf: book.shelf }));
  }

  render() {
    const { shelf } = this.state;
    const { classes, updateBookDetails, book } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} htmlFor="books-type">
            Move to...
          </InputLabel>
          <Select
            style={{ width: 175 }}
            autoWidth
            onChange={(e) => {
              updateBookDetails(book, e.target.value);
              this.setState(() => ({ shelf: e.target.value }));
            }}
            value={shelf}
          >
            <MenuItem value="" disabled>
              Move to...
            </MenuItem>
            <MenuItem value="currentlyReading">Currently Reading</MenuItem>
            <MenuItem value="wantToRead">Want to Read</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(CustomSelect);
