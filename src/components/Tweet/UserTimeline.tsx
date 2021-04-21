import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Tweet.css';
import request from 'superagent';
import Tweet from 'react-tweet';
import Session from '../../core/Session';
import { Status } from '../../commonTypes';

export namespace UserTimelineNamespace {
  export interface Props {}

  export interface State {
    tweetDiv: JSX.Element[];
    showHomeTimeline: boolean;
    searchTweetText: string;
  }
}

class UserTimeline extends React.Component<
  UserTimelineNamespace.Props,
  UserTimelineNamespace.State
> {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      tweetDiv: [],
      showHomeTimeline: false,
      searchTweetText: '',
    };
  }

  getTweets(e?) {
    var e = e ? e.preventDefault() : '';
    var self = this;
    request
      .get('/api/twitter/user_timeline')
      .query({
        accessToken: Session.getAccessToken(),
        accessTokenSecret: Session.getAccessTokenSecret(),
      })
      .end(function(err, res) {
        if (!err) {
          var tweets: Status[] = res.body.response;
          var tweetDiv: JSX.Element[] = [];
          if (tweets) {
            tweets.forEach((tweet: Status, index: number) =>
              tweetDiv.push(<Tweet data={tweet} key={index} />),
            );
            self.setState({ tweetDiv: tweetDiv });
          }
        } else {
          console.error(err)          
        }
      });
  }

  componentDidMount() {
    if (Session.getAccessToken() && Session.getAccessTokenSecret()) {
      this.getTweets();
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.tweetDiv.length > 0 ? (
            this.state.tweetDiv
          ) : (null
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(s)(UserTimeline);
