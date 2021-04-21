import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Tweet.css';
import request from 'superagent';
import Tweet from 'react-tweet';
import { Row, Col } from 'react-bootstrap';
import Session from '../../core/Session';
import { Status, TweetDiv } from '../../commonTypes';

export namespace FavouritesTimelineNamespace {
  export interface Props {}

  export interface State {
    tweetsDiv: TweetDiv[];
  }
}

class FavouritesTimeline extends React.Component<
  FavouritesTimelineNamespace.Props,
  FavouritesTimelineNamespace.State
> {
  constructor(props) {
    super(props);
    this.state = {
      tweetsDiv: [],
    };
  }

  getFavouritedTweets() {
    let favouritedTweets: Status[] = Session.getAllFavouritedTweets();

    let tweetsDiv: TweetDiv[] = [];
    if (favouritedTweets) {
      favouritedTweets.forEach((tweet: Status) => {
        let parsedTweetData: Status = JSON.parse(tweet);
        tweetsDiv.push({
          tweetElement: <Tweet data={parsedTweetData} />,
          button: (
            <button
              className={s.buttons}
              onClick={() => this.deleteATweet(parsedTweetData.id_str)}
            >
              Remove
            </button>
          ),
          retweetButton: (
            <button
              className={s.buttons}
              onClick={() => this.retweet(parsedTweetData.id_str)}
            >
              Retweet
            </button>
          ),
          id_str: parsedTweetData.id_str,
        });
      });
      this.setState({ tweetsDiv: tweetsDiv });
    } else {
      tweetsDiv.push({
        tweetElement: <span>no favourites</span>,
        button: <React.Fragment></React.Fragment>,
        id_str: '',
      });
      this.setState({ tweetsDiv: tweetsDiv });
    }
  }

  deleteATweet(tweetID: string) {
    Session.removeTweet(tweetID);
    const newTweetsDiv: TweetDiv[] = [];
    this.state.tweetsDiv.forEach((tDiv: TweetDiv) => {
      if (tDiv.id_str != tweetID) {
        newTweetsDiv.push(tDiv);
      }
    });
    this.setState({ tweetsDiv: newTweetsDiv });
  }

  retweet(tweetID: string) {
    var self = this;

    request
      .get('api/twitter/retweet')
      .query({
        accessToken: Session.getAccessToken(),
        accessTokenSecret: Session.getAccessTokenSecret(),
        tweetId: tweetID,
      })
      .end(function(err, res) {
        // if (res) console.log(res);

        if (res) {
          if (res.status == 200 && res.text == '{}') {
            let replaceButtonTxt = <div>Successfully retweeted!</div>;
            self.setState({
              tweetsDiv: self.state.tweetsDiv.map((el: TweetDiv) =>
                el.id_str === tweetID
                  ? {
                      tweetElement: el.tweetElement,
                      button: el.button,
                      retweetButton: replaceButtonTxt,
                      id_str: el.id_str,
                    }
                  : el,
              ),
            });
          } else if (res.text) {
            let replaceButtonTxt = (
              <div>{JSON.parse(res.text).response.message}</div>
            );
            self.setState({
              tweetsDiv: self.state.tweetsDiv.map((el: TweetDiv) =>
                el.id_str === tweetID
                  ? {
                      tweetElement: el.tweetElement,
                      button: el.button,
                      retweetButton: replaceButtonTxt,
                      id_str: el.id_str,
                    }
                  : el,
              ),
            });
          } else {
            console.error(err)          
          }
        }
      });
  }

  componentDidMount() {
    if(Session.getAccessToken() && Session.getAccessTokenSecret()){
      this.getFavouritedTweets();
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.tweetsDiv.length > 0 ? (
            this.state.tweetsDiv.map((tDiv: TweetDiv, i: number) => {
              return (
                <div className={s.tweetContainer} key={i}>
                  {tDiv.tweetElement}
                  {tDiv.button}
                  {tDiv.retweetButton}
                </div>
              );
            })
          ) : (
            <Row>
              <Col sm={4}>
                {Session.getAccessToken() && Session.getAccessTokenSecret() ? (
                  <div>No favourited tweets currently.</div>
                ) : (
                  <div>
                    Please login in order to view your favourited tweets.
                  </div>
                )}
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FavouritesTimeline);
