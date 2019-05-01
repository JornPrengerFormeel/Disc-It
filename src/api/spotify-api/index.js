import { BaseRequest } from '../BaseRequest';

const endpoint = 'https://api.spotify.com/v1/';

class SpotifyApi {
    static getHeaders() {
        const access_token = localStorage.getItem('access_token');
        return {
            Authorization: `Bearer ${access_token}`,
        };
    }

    static async search(query, type, limit, offset) {
        // https://developer.spotify.com/documentation/web-api/reference/search/search/
        const url = encodeURI(`${endpoint}search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`);
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }

    static async recommendations(artists) {
        // https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
        artists = artists.join(',');
        const url = encodeURI(`${endpoint}recommendations?seed_artists=${artists}`);
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }

    static async addPlaylist(userid, playlistname) {
        const url = `${endpoint}users/${userid}/playlists`;
        const headers = this.getHeaders();
        const body = {
            name : playlistname,
            public : false
        }

        return BaseRequest.sendPostRequest(url, body, headers);
    }

    static async addTracks(playlistid, tracks) {
        const url = `${endpoint}playlists/${playlistid}/tracks`;
        const headers = this.getHeaders();
        const body = {
            uris : tracks
        }
        return BaseRequest.sendPostRequest(url, body, headers);
    }

    static async getUser() {
        const url = `${endpoint}me`;
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }

    static async getUser() {
        const url = `${endpoint}me`;
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }
}

export { SpotifyApi };
