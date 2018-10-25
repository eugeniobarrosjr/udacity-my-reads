import React, { Component } from 'react';
import propTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  FormControl, Select, InputLabel, MenuItem,
} from '@material-ui/core';

import styles from './styles';
import * as BooksAPI from '../../services/BooksAPI';

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
    const {
      book: { shelf },
    } = this.props;

    this.setState(() => ({
      shelf,
    }));
  }

  render() {
    const { shelf } = this.state;
    const { classes, book, updateBookDetails } = this.props;
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} htmlFor="books-type">
            Move to...
          </InputLabel>
          <Select
            style={{ width: 175 }}
            autoWidth
            value={shelf}
            onChange={(e) => {
              BooksAPI.update(book, e.target.value).then(() => updateBookDetails());
              this.setState({ shelf: e.target.value });
            }}
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
