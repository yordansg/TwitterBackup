'use strict';
var querystring = require('querystring'),
  oauth = require('oauth');

const baseUrl = 'https://api.twitter.com/1.1/';

var Twitter: any = function(this, options) {
  if (!(this instanceof Twitter)) return new Twitter(options);

  this.consumerKey = options.consumerKey;
  this.consumerSecret = options.consumerSecret;
  this.callback = options.callback;

  this.x_auth_access_type = options.x_auth_access_type;

  this.oa = new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    this.consumerKey,
    this.consumerSecret,
    '1.0A',
    this.callback,
    'HMAC-SHA1',
  );

  return this;
};

Twitter.prototype.getRequestToken = function(callback) {
  this.oa.getOAuthRequestToken(
    { x_auth_access_type: this.x_auth_access_type },
    function(error, oauthToken, oauthTokenSecret, results) {
      if (error) {
        callback(error);
      } else {
        callback(null, oauthToken, oauthTokenSecret, results);
      }
    },
  );
};

Twitter.prototype.getAccessToken = function(
  requestToken,
  requestTokenSecret,
  oauth_verifier,
  callback,
) {
  this.oa.getOAuthAccessToken(
    requestToken,
    requestTokenSecret,
    oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        callback(error);
      } else {
        callback(null, oauthAccessToken, oauthAccessTokenSecret, results);
      }
    },
  );
};

Twitter.prototype.verifyCredentials = function(
  accessToken,
  accessTokenSecret,
  params,
  callback,
) {
  var url = baseUrl + 'account/verify_credentials.json';
  if (typeof params == 'function') {
    callback = params;
  } else {
    url += '?' + querystring.stringify(params);
  }
  this.oa.get(url, accessToken, accessTokenSecret, function(
    error,
    data,
    response,
  ) {
    if (error) {
      callback(error);
    } else {
      try {
        var parsedData = JSON.parse(data);
      } catch (e) {
        callback(e, data, response);
      }
      callback(null, parsedData, response);
    }
  });
};

module.exports = Twitter;
