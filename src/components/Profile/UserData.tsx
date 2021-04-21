import React from 'react';
import request from 'superagent';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './UserData.css';
import { Row, Image } from 'react-bootstrap';
import Session from '../../core/Session';
import { getUserDTODefaultValues, UserDTO } from '../../commonTypes';

export namespace UserDataNamespace {
  export interface Props {}

  export interface State {
    user: UserDTO;
  }
}

class UserData extends React.Component<
  UserDataNamespace.Props,
  UserDataNamespace.State
> {
  constructor(props) {
    super(props);
    this.state = {
      user: getUserDTODefaultValues(),
    };
  }

  componentDidMount() {
    var self = this;
    if (Session.getAccessToken() && Session.getAccessTokenSecret()) {
      request
        .get('/api/twitter/account/verify_credentials')
        .query({
          accessToken: Session.getAccessToken(),
          accessTokenSecret: Session.getAccessTokenSecret(),
        })
        .end(function(err, res) {
          if (!err) {
            var user = res.body.response;
            self.setState({ user: user });
          } else {
            console.error(err);          
          }
        });
    }
  }

  render() {
    const name = this.state.user.name ? this.state.user.name : '';
    const profileImage = this.state.user.profile_image_url
      ? this.state.user.profile_image_url
      : undefined;
    const screenName = this.state.user.screen_name
      ? this.state.user.screen_name
      : '';
    const tweetsCount = this.state.user.statuses_count
      ? this.state.user.statuses_count
      : 0;
    const followingCount = this.state.user.friends_count
      ? this.state.user.friends_count
      : '';
    const followersCount = this.state.user.followers_count
      ? this.state.user.followers_count
      : 0;

    const userProfile = (
      <div className={s.userInfoContainer}>
        <Image className={s.thumbnail} src={profileImage} rounded />
        <div className={s.fullName}>{name}</div>
        <div className={s.userName}>{screenName ? '@' + screenName : ''}</div>
        <Row className={s.userStats}>
          <div className={s.inline}>
            <div className={s.statName}>Tweets</div>
            <div className={s.statValue}>{tweetsCount}</div>
          </div>
          <div className={s.inline}>
            <div className={s.statName}>Following</div>
            <div className={s.statValue}>{followingCount}</div>
          </div>
          <div className={s.inline}>
            <div className={s.statName}>Followers</div>
            <div className={s.statValue}>{followersCount}</div>
          </div>
        </Row>
      </div>
    );

    let content: JSX.Element;
    if (this.state.user.name == getUserDTODefaultValues().name) {
      content =
        Session.getAccessToken() && Session.getAccessTokenSecret() ? (
          <div>Loading...</div>
        ) : (
          <div>Please login in order to view your twitter profile data.</div>
        );
    } else {
      content = userProfile;
    }

    return content;
  }
}

export default withStyles(s)(UserData);
