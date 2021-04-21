import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Profile.css';
import { Row, Col } from 'react-bootstrap';
import UserTimeline from '../../components/Tweet/UserTimeline';
import UserData from '../../components/Profile/UserData';

class Profile extends React.Component {
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
            <Col sm={4}>
              <UserData />
            </Col>
            <Col sm={8}>
              <UserTimeline />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
