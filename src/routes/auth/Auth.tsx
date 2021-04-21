import React from 'react';
import PropTypes from 'prop-types';
import Session from '../../core/Session';
import history from '../../history';

export namespace AuthNamespace {
  export interface Props {
    accessToken: string;
    accessTokenSecret: string;
  }

  export interface State {}
}

export class Auth extends React.Component<
  AuthNamespace.Props,
  AuthNamespace.State
> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    accessTokenSecret: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Session.setAccessToken(this.props.accessToken);
    Session.setAccessTokenSecret(this.props.accessTokenSecret);
    history.push('/profile');
  }

  render() {
    return <div style={{ height: '500px' }}></div>;
  }
}
