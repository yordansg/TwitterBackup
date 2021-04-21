import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Navigation.css';
import Session from '../../core/Session';
import AppConstants from '../../constants/AppConstants';
import history from '../../history';

export namespace NavigationNamespace {
  export interface Props {}

  export interface State {
    showNavigation: boolean;
  }
}

class Navigation extends React.Component<
  NavigationNamespace.Props,
  NavigationNamespace.State
> {
  constructor(props) {
    super(props);
    this.state = {
      showNavigation: false,
    };
    // this._signInTwitter = this._signInTwitter.bind(this);
  }

  componentDidMount() {
    if (Session.getAccessToken() && Session.getAccessTokenSecret()) {
      this.setState({ showNavigation: true });
    } else {
      this.setState({ showNavigation: false });
    }
  }

  goToHomeTimeline(e) {
    e.preventDefault();
    history.push('/');
  }

  goToUserTimeline(e) {
    e.preventDefault();
    history.push('/profile');
  }

  goToFavouritesTimeline(e) {
    e.preventDefault();
    history.push('/favourites');
  }

  signInTwitter() {
    window.location.assign(
      AppConstants.WEB_APP_URL + '/api/twitter/request-token',
    );
  }

  logout() {
    Session.removeAccessTokenAndSecret();
    history.push('/');
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {Session.getAccessToken() && Session.getAccessTokenSecret() ? (
            <React.Fragment>
              <li>
                <a onClick={(e)=>this.goToHomeTimeline(e)}>Home</a>
              </li>
              <li>
                <a onClick={(e)=>this.goToUserTimeline(e)}>Profile</a>
              </li>
              <li>
                <a onClick={(e)=>this.goToFavouritesTimeline(e)}>
                  Favourites
                </a>
              </li>
            </React.Fragment>
          ) : null}
          {Session.getAccessToken() && Session.getAccessTokenSecret() ? (
            <React.Fragment>
              <button className={s.button} onClick={()=>this.signInTwitter()}>
                Sign in With Another Account
              </button>
              <button className={s.button} onClick={()=>this.logout()}>
                Logout
              </button>
            </React.Fragment>
          ) : (
            <button className={s.button} onClick={()=>this.signInTwitter()}>
              Sign in With Twitter
            </button>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default withStyles(s)(Navigation);
