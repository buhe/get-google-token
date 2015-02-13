var getGoogleToken = require('./index')
exports = module.exports = function() {
    var code = process.argv[2],
        clientId = process.argv[3],
        clientSecret = process.argv[4],
        redirect_uri = process.argv[5];

	console.log('code:' + code);
    console.log('clientId:' + clientId);
    console.log('clientSecret:' + clientSecret);
    console.log('redirect_uri:' + redirect_uri);

    getGoogleToken.getAndRefreshGoogleToken(code, clientId, clientSecret, redirect_uri,
        function(err, json, res) {
            if (err) return console.log('Refresh token fail.');
            
            console.log('Refresh token successful.');

        })

};
exports()