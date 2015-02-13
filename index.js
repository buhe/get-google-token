var request = require('request');
var refresh = require('google-refresh-token');

exports = module.exports = getGoogleToken;

function getGoogleToken(code, clientId, clientSecret, redirect_uri, cb) {
  console.log('POST --> https://accounts.google.com/o/oauth2/token')
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
    console.log(body)
    if (err){
      return cb(err, body, res);
    } 
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
    getGoogleToken(code, clientId, clientSecret, redirect_uri, function(err, body, res) {
        console.log(err)
        if(err){
          return cb(err,body,res);
        }
        var refreshToken = body.refreshToken;
        console.log('Got refresh token:'+refreshToken+',Start try refresh token.')
        refresh(refreshToken, clientId, clientSecret, redirect_uri, cb);
      })
    }

