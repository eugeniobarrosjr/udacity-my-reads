import React from 'react';
import propTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardMedia, Typography, CardActions, Divider,
} from '@material-ui/core';

import CustomSelect from '../CustomSelect/index';
import defaultImage from '../../assets/images/defbookcover.jpg';
import styles from './styles';

const BookCard = ({ classes, updateBookDetails, book }) => (
  <Card key={book.id} className={classes.card}>
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textPrimary">
          {book.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {book.authors || ''}
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.cover}
        image={book.imageLinks ? book.imageLinks.thumbnail : defaultImage}
        title={book.title}
      />
    </div>
    <Divider />
    <CardActions>
      <CustomSelect book={book} updateBookDetails={updateBookDetails} />
    </CardActions>
  </Card>
);

BookCard.propTypes = {
  book: propTypes.shape({
    id: propTypes.string,
    imageLinks: propTypes.shape({
      thumbnail: propTypes.string,
    }),
    title: propTypes.string,
    authors: propTypes.array,
  }).isRequired,
  classes: propTypes.shape({}).isRequired,
  updateBookDetails: propTypes.func.isRequired,
};

export default withStyles(styles)(BookCard);
