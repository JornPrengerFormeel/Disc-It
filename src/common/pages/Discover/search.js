import React, { Component } from 'react';
import styled from 'styled-components';

import { BaseRequest } from '../../../api/BaseRequest.js';
import { SpotifyApi } from '../../../api/spotify-api';
import { Title, TitleSub } from '../../components/Discover';
import { DiscItApi } from '../../../api/discit-api/DiscItApi';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            seeds: [],
            tracks: []
        };

        this.logout = this.logout.bind(this);
        this.discover = this.discover.bind(this);
        this.create = this.create.bind(this);
        this.discover_long_term_artists = this.discover_long_term_artists.bind(this);
        this.discover_followed_artists = this.discover_followed_artists.bind(this);

        this.discover();
    }

    logout() {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      window.location = "https://discit.app";
    }

    async discover_long_term_artists(header) {
      return await BaseRequest.sendGetRequest("https://api.spotify.com/v1/me/top/artists?time_range=long_term", header);
    }

    async discover_followed_artists(header) {
      return await BaseRequest.sendGetRequest("https://api.spotify.com/v1/me/following?type=artist&limit=20", header);
    }

   discover() {
      let header = {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            },

            seeds = [];

      this.discover_long_term_artists(header).then(result => {
        this.setState({ mode: 0, seeds: [], tracks: [] });
        if (result.error) {
          if (result.error.message === "The access token expired") {
            DiscItApi.refreshTokens().then((response) => {
              if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                this.discover();
              } else {
                this.logout();
              }
            });
          }
        } else {
          result.items.forEach(artist => { seeds.push({id: artist.id, name: artist.name}); });
          this.discover_followed_artists(header).then(result => {
            result.artists.items.forEach(artist => { seeds.push({id: artist.id, name: artist.name}); });
            let seeds_shuffled = [...new Set(seeds)].sort(() => 0.5 - Math.random());
            SpotifyApi.recommendations(seeds_shuffled.slice(0, 5).map((a,i)=>a.id)).then(result => {
              this.setState({ mode: 1, seeds: seeds_shuffled.slice(0, 5), tracks: result.tracks });
            });
          });
        }
      });
    }

    async create () {
      const user = await SpotifyApi.getUser();
      if (user.error) { return console.warn(user.error); }

      const playlist = await SpotifyApi.addPlaylist(user.id, "DiscIt");
      if (playlist.error) { return console.warn(user.error); }

      const tracks = this.state.tracks.map(x => x.uri);
      const result = await SpotifyApi.addTracks(playlist.id, tracks);

      this.discover();
    }

    render() {

      if (this.state.mode == 0) {
        return (
            <Area>
                <Title>...Loading...</Title>
            </Area>
        );
      }

      else {
        return (
            <Area>

                <Logout onClick={this.logout}>Logout</Logout>

                <Title>Playlist</Title>
                <TitleSub>Inspired by:</TitleSub>

                <Inspired>{this.state.seeds.map((x,i) => x.name).join(" • ")}</Inspired>

                <ResultsContainer>
                  {this.state.tracks.map((result,i) =>
                    <ResultsRow>
                      <ResultsRowContainer>
                        <ResultsAlbum src={result.album.images[0].url}/>
                        <ResultsTextContainer>
                          <ResultsName>{(result.name.length < 34) ? result.name : result.name.substring(0, 30)+"..."}</ResultsName>
                          <ResultsArtist>{(result.artists[0].name.length < 34) ? result.artists[0].name : result.artists[0].name.substring(0, 30)+"..."}</ResultsArtist>
                        </ResultsTextContainer>
                      </ResultsRowContainer>
                    </ResultsRow>
                  )}
                </ResultsContainer>

                <MyButton onClick={this.create}>Create</MyButton>
                <MyButton onClick={this.discover}>Refresh</MyButton>

            </Area>
        );
      }

    }
}

const Area = styled.div`
    width:375px;
    padding: 5px;
    background: #ddefe4;
    border: solid 2px #012d11;
    border-radius: 4px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    position: relative;
`;

const MyButton = styled.button`
    color: white;
    background-color: #159141;
    padding:3px;
    font-weight: bold;
    border: solid 2px #012d11;
    border-radius: 4px;
    width:100px;
    cursor:pointer;
    margin:5px;
    display: inline-block;
    vertical-align: top;

    &:hover {
        background:#2f2f2f;
        color:white;
    }

    &:focus {
      outline: none;
    }
`;

const Inspired = styled.div`
    font-size: 14px;
    margin: 2px 0 5px 0;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    `;

const ResultsContainer = styled.div`
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    margin: 5px 0;
    width: 350px;
    height: 350px;
    background-color: #b7d4c2;
    border: solid 2px #012d11;
    border-radius: 4px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    `;

const ResultsRow = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: 5px 0;
    padding-left: 10px;
    width: 100%;
    height: 45px;
    text-align: left;
    `;

const ResultsRowContainer = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 0;
    height: 45px;
    `;

const ResultsTextContainer = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 0;
    height: 45px;
    width: 260px;
    overflow: hidden;
    `;

const ResultsAlbum = styled.img`
  display: inline-block;
  vertical-align: top;
  width: 45px;
  height: 45px;
  margin-right: 5px;
`

const ResultsName = styled.div`
  /* display: inline-block;
  vertical-align: top; */
  height: 18px;
  line-height: 18px;
  font-size: 13px;
  font-weight: bold;
  margin-right: 5px;
`

const ResultsArtist = styled.div`
  /* display: inline-block;
  vertical-align: top; */
  height: 18px;
  line-height:18px;
  font-size: 12px;
`

const Logout = styled.div`
  display: inline-block;
  vertical-align: top;
  background-color: #012d11;
  color: white;
  font-size: 10px;
  padding: 2px 7px 2px 7px;
  position: absolute;
  top: -1px;
  right: -1px;
  border-radius: 0 4px 0 4px;
  z-index: 3;

  &:hover {
      color: #e6e6e6;
      cursor: pointer;
  }
`


export default Search;
