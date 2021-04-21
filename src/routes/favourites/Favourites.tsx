import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Favourites.css';
import { Row, Col } from 'react-bootstrap';
import FavouritesTimeline from '../../components/Tweet/FavouritesTimeline';

class Favourites extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Row>
            <Col sm={12}>
              <FavouritesTimeline />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Favourites);
