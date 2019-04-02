import React, { Component } from 'react';
import styled from 'styled-components';

import { BaseRequest } from '../../../api/BaseRequest.js';
import { SpotifyApi } from '../../../api/spotify-api';
import { Title } from '../../components/Discover';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };

        this.search = this.search.bind(this);
        this.discover = this.discover.bind(this);
        this.discover_long_term_artists = this.discover_long_term_artists.bind(this);
        this.discover_followed_artists = this.discover_followed_artists.bind(this);
        this.discover_recent_tracks = this.discover_recent_tracks.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async search() {
        const artist = this.state.query.trim();
        if (artist.length < 1) return;
        const results = await SpotifyApi.search(artist, 'artist', 6, 0);
        if (results.artists) {
            this.props.updateResults('searched', results.artists.items);
        }
    }

    async discover_long_term_artists() {
        const access_token = localStorage.getItem('access_token'),
              result = await BaseRequest.sendGetRequest("https://api.spotify.com/v1/me/top/artists?time_range=long_term",
                       {
                         'Accept': 'application/json, text/plain, */*',
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+access_token
                       });
        return result;
    }

    async discover_followed_artists() {
        const access_token = localStorage.getItem('access_token'),
              result = await BaseRequest.sendGetRequest("https://api.spotify.com/v1/me/following?type=artist&limit=20",
                       {
                         'Accept': 'application/json, text/plain, */*',
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+access_token
                       });
        return result;
    }

    async discover_recent_tracks() {
        const access_token = localStorage.getItem('access_token'),
              result = await BaseRequest.sendGetRequest("https://api.spotify.com/v1/me/player/recently-played?type=track",
                       {
                         'Accept': 'application/json, text/plain, */*',
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+access_token
                       });
        return result;
    }

    discover() {
      let long_term_artists = this.discover_long_term_artists(),
          followed_artists = this.discover_followed_artists(),
          recent_tracks = this.discover_recent_tracks();

      console.log(long_term_artists);
      console.log(followed_artists);
      console.log(recent_tracks);
    }


    checkUnique = (data) => {
        // check id is unique
        const seeds = this.props.seeds;
        for (let i = 0; i < seeds.length; i++) {
            if (seeds[i].item.id === data.item.id) return false;
        }
        return true;
    }

    addItem =(item) => {
        const data = {
            type: 'artist',
            item,
        };
        if (this.checkUnique(data)) {
            this.props.selectItem('seeds', data);
        }
    }

    render() {
        return (
            <Area>
                <Title>Find</Title>

                <Go onClick={this.discover}>Discover</Go>

            </Area>
        );
    }
}

const Area = styled.div`
    width:500px;
    margin:0 12px;
    min-height:300px;
    background:#eee;
    display:flex;
    flex-direction:column;
`;

const Go = styled.button`
    padding:10px;
    background:white;
    border:solid 1px black;
    width:250px;
    cursor:pointer;
    max-width:100%;
    min-width:50%;
    margin:10px auto;

    &:hover {
        background:#2f2f2f;
        color:white;
    }
`;


export default Search;
