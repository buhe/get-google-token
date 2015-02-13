var request = require('request');
var refresh = require('google-token-refresh');
/**
 * @param {String} refreshToken is the refresh token returned from the
 *   authorization code exchange.
 * @param {String} clientId is the client_id obtained during application registration.
 * @param {String} clientSecret is the client secret obtained during the
 *   application registration.
 * @param {Function} cb(err, {accessToken, expiresIn, idToken}, response);
 */
exports = module.exports = getGoogleToken;

function getGoogleToken(code, clientId, clientSecret, redirect_uri, cb) {
  request.post('https://accounts.google.com/o/oauth2/token', {
    form: {
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    json: true
  }, function(err, res, body) {
    // `body` should look like:
    // {
    //   "access_token":"1/fFBGRNJru1FQd44AzqT3Zg",
    //   "expires_in":3920,
    //   "token_type":"Bearer",
    // }
    if (err) return cb(err, body, res);
    if (parseInt(res.statusCode / 100, 10) !== 2) {
      if (body.error) {
        return cb(new Error(res.statusCode + ': ' + (body.error.message || body.error)), body, res);
      }
      if (!body.access_token) {
        return cb(new Error(res.statusCode + ': refreshToken error'), body, res);
      }
      return cb(null, body, res);
    }
    cb(null, {
      accessToken: body.access_token,
      expiresIn: body.expires_in,
      expiresAt: +new Date + parseInt(body.expires_in, 10),
      idToken: body.id_token,
      refreshToken: body.refresh_token
    }, res);
  });
}

exports.getAndRefreshGoogleToken = function(code, clientId, clientSecret, redirect_uri, cb) {
    getGoogleToken(code, clientId, clientSecret, redirect_uri, function(err, json, res) {
        if (err) return handleError(err);
        if (json.error) return handleError(new Error(res.statusCode + ': ' + json.error))

        var refreshToken = json.refreshToken;
        refresh(refreshToken, clientId, clientSecret, redirect_uri, function(err, json, res) {
          if (err) return handleError(err);
          if (json.error) return handleError(new Error(res.statusCode + ': ' + json.error))
          var accessToken = json.accessToken;
          refresh.checkTokenValidity(accessToken,cb);
        })
      }
    }
