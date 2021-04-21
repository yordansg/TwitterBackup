import { Status } from '../commonTypes';

class Session {
  getAccessToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
  }

  setAccessToken(accessToken) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
  }

  getAccessTokenSecret() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessTokenSecret');
    }
  }

  setAccessTokenSecret(accessTokenSecret) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('accessTokenSecret', accessTokenSecret);
    }
  }

  getTweet(tweetID: string) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(
        `tweet_${localStorage.getItem('accessToken')}_${tweetID}`,
      );
    }
  }

  setTweet(tweet: Status, tweetID: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        `tweet_${localStorage.getItem('accessToken')}_${tweetID}`,
        JSON.stringify(tweet),
      );
    }
  }

  getAllFavouritedTweets() {
    if (typeof localStorage !== 'undefined') {
      var filteredObj = {};
      var accessToken = localStorage.getItem('accessToken');
      Object.keys(localStorage)
        .filter(key => {
          return key.indexOf(`tweet_${accessToken}`) >= 0;
        })
        .map(key => {
          filteredObj[key] = localStorage.getItem(key);
        });

      return Object.values(filteredObj);
    }
  }

  removeTweet(tweetID) {
    if (typeof localStorage !== 'undefined') {
      var accessToken = localStorage.getItem('accessToken');
      localStorage.removeItem(`tweet_${accessToken}_${tweetID}`);
    }
  }

  removeAccessTokenAndSecret() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenSecret');
    }
  }

  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear(); // this will delete all localstorage;
    }
  }
}

export default new Session();
