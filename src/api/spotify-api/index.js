import { BaseRequest } from '../BaseRequest';

const endpoint = 'https://api.spotify.com/v1/';

class SpotifyApi {
    
    static async search(query, type, limit, offset) {
        /*
        https://developer.spotify.com/documentation/web-api/reference/search/search/
        */
        const url = encodeURI(`${endpoint}search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`);
        const access_token = localStorage.getItem('access_token')

        const headers = {
            'Authorization' : `Bearer ${access_token}`
        }
        return BaseRequest.sendGetRequest(url, headers);
    }
}

export {SpotifyApi}