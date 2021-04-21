import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Tweet.css';
import request from 'superagent';
import Tweet from 'react-tweet';
import { Row, Col } from 'react-bootstrap';
import Session from '../../core/Session';
import { Status, TweetDiv } from '../../commonTypes';

export namespace HomeTimelineNamespace {
  export interface Props {}

  export interface State {
    tweetsDiv: TweetDiv[];
    showMoreContainer: JSX.Element[];
  }
}

class HomeTimeline extends React.Component<
  HomeTimelineNamespace.Props,
  HomeTimelineNamespace.State
> {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      tweetsDiv: [],
      showMoreContainer: [],
    };
  }

  getTweets(url: string, tweetId?: string) {
    var self = this;

    let query = tweetId
      ? {
          accessToken: Session.getAccessToken(),
          accessTokenSecret: Session.getAccessTokenSecret(),
          tweetId: tweetId,
        }
      : {
          accessToken: Session.getAccessToken(),
          accessTokenSecret: Session.getAccessTokenSecret(),
        };

    request
      .get(`api/twitter/home_timeline/${url}`)
      .query(query)
      .end(function(err, res) {
        let currentTweetsDiv: TweetDiv[] = [];
        let showMoreContainer: JSX.Element[] = [];

        if (res) {
          if (
            res.body.response &&
            res.body.response.length > 0 &&
            !res.body.response.errors
          ) {
            var tweets = res.body.response;
            var tweetsCount = tweets.length;
            tweets.forEach((tweet: Status, index: number) => {
              let currentButtonContainer: JSX.Element;
              if (!Session.getTweet(tweet.id_str)) {
                currentButtonContainer = (
                  <button
                    className={s.buttons}
                    key={`button_${index}`}
                    onClick={() => self.storeATweet(tweet, tweet.id_str)}
                  >
                    Store
                  </button>
                );
              } else {
                currentButtonContainer = <div>Already stored!</div>;
              }
              currentTweetsDiv.push({
                tweetElement: <Tweet data={tweet} key={`tweet_${index}`} />,
                button: currentButtonContainer,
                id_str: tweet.id_str,
              });
              if (index == tweetsCount - 1) {
                showMoreContainer.push(
                  <button
                    className={s.buttons}
                    key={`showmore_${index}`}
                    onClick={() => self.getTweets('next', tweet.id_str)}
                  >
                    Show more
                  </button>,
                );
              }
            });
            self.setState({
              tweetsDiv: self.state.tweetsDiv.concat(currentTweetsDiv),
              showMoreContainer: showMoreContainer,
            });
          } else {
            currentTweetsDiv.push({
              tweetElement: <span>Rate limit exceeded</span>,
              button: <React.Fragment></React.Fragment>,
              id_str: '',
            });
            self.setState({
              tweetsDiv: self.state.tweetsDiv.concat(currentTweetsDiv),
            });
          }
        }
      });
  }

  storeATweet(tweet: Status, tweetID: string) {
    Session.setTweet(tweet, tweetID);

    let replaceButtonTxt = <div>Successfully stored!</div>;
    this.setState({
      tweetsDiv: this.state.tweetsDiv.map((el: TweetDiv) =>
        el.id_str === tweetID
          ? {
              tweetElement: el.tweetElement,
              button: replaceButtonTxt,
              id_str: tweetID,
            }
          : el,
      ),
    });
  }

  componentDidMount() {
    if (Session.getAccessToken() && Session.getAccessTokenSecret()) {
      this.getTweets('initial');
    }
  }

  render() {
    return (
      <div className={s.root}>
        {Session.getAccessToken() && Session.getAccessTokenSecret() ? (
          <div className={s.container}>
            {this.state.tweetsDiv.length > 0 ? (
              this.state.tweetsDiv.map((tDiv: TweetDiv, i: number) => {
                return (
                  <div className={s.tweetContainer} key={i}>
                    {tDiv.tweetElement}
                    {tDiv.button}
                  </div>
                );
              })
            ) : (
              <Row>
                <Col sm={4}>
                  <div>Loading...</div>
                </Col>
              </Row>
            )}
            <div className={s.showMore}>{this.state.showMoreContainer}</div>
          </div>
        ) : (
          <div className={s.publicContainer}>
            <h1 className={s.publicTitle}>Welcome to Twitter Backup App!</h1>
            <p className={s.publicParagraph}>
              Here you are able to log in with your twitter account. View tweets
              of pages and people that you follow. Then you can review your
              favourite tweets and choose to retweet them. Or you could try to
              remove some of them. Maybe log in with different twitter account.
              Check out your tweets, retweets and some basic profile data. It's
              up to you!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(HomeTimeline);
