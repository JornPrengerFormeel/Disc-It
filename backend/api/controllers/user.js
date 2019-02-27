const SpotifyWebApi = require('spotify-web-api-node'),
      spotifyApi = new SpotifyWebApi( require('../../credentials.json') ),
      crypto = require('crypto');

// Generates a URL the users visits to link their account.
exports.get_login_url = function(req, res) {
  let scopes = ["user-top-read", "playlist-modify-private", "user-follow-read", "user-library-read"],
      state = crypto.randomBytes(4).toString('hex'),
      authorize_url = spotifyApi.createAuthorizeURL(scopes, state);
      res.status(200).send(authorize_url);
};
