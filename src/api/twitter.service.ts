import { Router } from 'express';
import Twit from 'twit';
import AppConstants from '../constants/AppConstants';
import { UserDTO } from '../commonTypes';
const TwitterAuth = require('./twitterAuth');
const router = Router();

//=========================================
//TWITTER OAuth APIs
//=========================================
//Config for Twitter OAuth
var twitterAuth = new TwitterAuth({
  consumerKey: AppConstants.CONSUMER_KEY,
  consumerSecret: AppConstants.CONSUMER_SECRET,
  callback: 'http://localhost:3000/api/twitter/access-token',
});
let _requestSecret: any;

//-----------------------------------------
// GET request_token
//-----------------------------------------
router.get('/request-token', (req, res) => {
  twitterAuth.getRequestToken(function(
    err: any,
    requestToken: string,
    requestSecret: string,
  ) {
    if (err) res.status(500).send(err);
    else {
      _requestSecret = requestSecret;
      res.redirect(
        'https://api.twitter.com/oauth/authenticate?oauth_token=' +
          requestToken,
      );
    }
  });
});

//-----------------------------------------
// GET access_token
//-----------------------------------------
router.get('/access-token', (req, res) => {
  var requestToken = req.query.oauth_token,
    verifier = req.query.oauth_verifier;
  twitterAuth.getAccessToken(requestToken, _requestSecret, verifier, function(
    err: any,
    accessToken: string,
    accessSecret: string,
  ) {
    if (err) {
      res.status(500).send(err);
    } else
      twitterAuth.verifyCredentials(accessToken, accessSecret, function(
        err: any,
        user: UserDTO,
      ) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.redirect(
            AppConstants.WEB_APP_URL +
              '/auth/' +
              accessToken +
              '/' +
              accessSecret,
          );
        }
      });
  });
});

//=========================================
//TWITTER REST APIS
//=========================================
//Config for Twitter REST APIs
var TwitterAPI = new Twit({
  consumer_key: AppConstants.CONSUMER_KEY,
  consumer_secret: AppConstants.CONSUMER_SECRET,
  access_token: AppConstants.ACCESS_TOKEN,
  access_token_secret: AppConstants.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

//-----------------------------------------
// GET account/verify_credentials
//-----------------------------------------
router.get('/account/verify_credentials', (req, res) => {
  var userAccessToken = req.query.accessToken;
  var userAccessTokenSecret = req.query.accessTokenSecret;
  var tokens = TwitterAPI.getAuth();
  tokens.access_token = userAccessToken?.toString();
  tokens.access_token_secret = userAccessTokenSecret?.toString();
  TwitterAPI.setAuth(tokens);

  TwitterAPI.get('account/verify_credentials', { skip_status: true })
    .catch(function(err) {
      // console.log('caught error', err.stack);
    })
    .then(function(result) {
      res.json({ response: (result as any).data });
    });
});

//-----------------------------------------
// GET statuses/home_timeline/initial -> initial portion of tweets with hardcoded count of 20; TODO: remove hardcoded value
//-----------------------------------------
router.get('/home_timeline/initial', (req, res) => {
  var tokens = TwitterAPI.getAuth();
  TwitterAPI.setAuth(tokens);
  TwitterAPI.get(
    'statuses/home_timeline',
    {
      q: req.query.q as any,
      count: 20,
    },
    function(err, data, response) {
      res.json({ response: data });
    },
  );
});

//-----------------------------------------
// GET statuses/home_timeline/next -> next portion of tweets older than specified tweetID
//-----------------------------------------
router.get('/home_timeline/next', (req, res) => {
  var tweetId: string = req.query.tweetId!.toString();
  var tokens = TwitterAPI.getAuth();
  TwitterAPI.setAuth(tokens);
  TwitterAPI.get(
    'statuses/home_timeline',
    {
      q: req.query.q as any,
      count: 20,
      max_id: tweetId,
    },
    function(err, data, response) {
      res.json({ response: data });
    },
  );
});

//-----------------------------------------
// GET statuses/user_timeline
//-----------------------------------------
router.get('/user_timeline', (req, res) => {
  var tokens = TwitterAPI.getAuth();
  TwitterAPI.setAuth(tokens);
  TwitterAPI.get('statuses/user_timeline', function(err, data, response) {
    res.json({ response: data });
  });
});

//-----------------------------------------
// POST retweet
//-----------------------------------------
router.get('/retweet', (req, res) => {
  var tweetId: string = req.query.tweetId!.toString();
  var tokens = TwitterAPI.getAuth();
  TwitterAPI.setAuth(tokens);
  TwitterAPI.post('statuses/retweet/:id', { id: tweetId }, function(response) {
    res.json({ response: response });
    // console.log(response);
  });
});

export default router;
