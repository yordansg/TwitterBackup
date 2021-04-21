import React from 'react';
import { Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';
import HomeTimeline from '../../components/Tweet/HomeTimeline';

export namespace HomeNamespace {
  export interface Props {}

  export interface State {}
}

class Home extends React.Component<HomeNamespace.Props, HomeNamespace.State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Row>
            <Col sm={8}>
              <HomeTimeline />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
