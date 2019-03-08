import { BaseRequest } from '../BaseRequest';

const endpoint = 'https://api.spotify.com/v1/';

class SpotifyApi {
    
    static getHeaders() {
        const access_token = localStorage.getItem('access_token')
        return {
            'Authorization' : `Bearer ${access_token}`
        }
    }
    static async search(query, type, limit, offset) {
        /*
        https://developer.spotify.com/documentation/web-api/reference/search/search/
        */
        const url = encodeURI(`${endpoint}search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`);
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }

    static async recommendations(recommendations) {
        //https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
        let artists = [];
        let tracks = [];
        let genres = [];


        //max number of seeds is 5 according to api 
        const max = recommendations.length >= 5 ? 5 : recommendations.length;
        for (let i = 0; i < max; i+=1) {
            const r = recommendations[i];
            if (r.type === 'artist') {
                artists.push(r.item.id);
            }

            if (r.type === 'genre') {
                genres.push(r.item.id);
            }

            if (r.type === 'track') {
                tracks.push(r.item.id);
            }
        }

        artists = artists.join(',');
        tracks = tracks.join(',');
        genres = genres.join(',');

        const url = encodeURI(`${endpoint}recommendations?seed_artists=${artists}&seed_tracks=${tracks}&seed_genres=${genres}`)
        const headers = this.getHeaders();
        return BaseRequest.sendGetRequest(url, headers);
    }
}

export {SpotifyApi}