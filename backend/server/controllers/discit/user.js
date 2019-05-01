const credentials = require('./credentials.json');
const SpotifyWebApi = require('spotify-web-api-node'),
      spotifyApi = new SpotifyWebApi( credentials  ),
      crypto = require('crypto');


const fetch = require('node-fetch');

// Generates a URL the users visits to link their account.
exports.get_login_url = function(req, res) {
  let scopes = ["user-top-read", "playlist-modify-private", "user-follow-read", "user-library-read", "user-read-recently-played"],
      state = crypto.randomBytes(4).toString('hex'),
      authorize_url = spotifyApi.createAuthorizeURL(scopes, state);
      res.status(200).send(authorize_url);
};


exports.get_access_token = async function(req, res) {
  const code = req.body.code,
        endpoint = 'https://accounts.spotify.com/api/token',
        base64encode = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64'),
        body = `grant_type=authorization_code&code=${code}&redirect_uri=${credentials.redirectUri}`,

        headers = {
          'Authorization' : `Basic ${base64encode}`,
          'Content-Type' : 'application/x-www-form-urlencoded'
        }

  try {
    const data = await fetch(endpoint, {
      method: 'post',
      body : body,
      headers : headers
    })
    const json = await data.json();
    return res.json(json);
  }
  catch (err) { return res.json({err:err}); }
}


exports.refresh_access_token = async function(req, res) {
  const token = req.body.token,
        endpoint = 'https://accounts.spotify.com/api/token',
        base64encode = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64'),
        body = `grant_type=refresh_token&refresh_token=${token}`,

        headers = {
          'Authorization' : `Basic ${base64encode}`,
          'Content-Type' : 'application/x-www-form-urlencoded'
        }

  try {
    const data = await fetch(endpoint, {
      method: 'post',
      body : body,
      headers : headers
    })
    const json = await data.json();
    return res.json(json);
  }
  catch (err) { return res.json({err:err}); }
}
