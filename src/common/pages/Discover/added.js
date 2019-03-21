import React, { Component } from 'react';
import styled from 'styled-components';

import { SpotifyApi } from '../../../api/spotify-api';
import { Title } from '../../components/Discover';

class Added extends Component {
    constructor(props) {
        super(props);

        this.addToPlaylist = this.addToPlaylist.bind(this);
    }
    state = {
        playlist : ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async addToPlaylist() {
        const playlistName = this.state.playlist.trim();
        
        
        if (playlistName.length < 1) return;
        //add tracks
        const user = await SpotifyApi.getUser();
        if (user.error) {
            //error
            return console.warn(user.error);
        }
        const playlist = await SpotifyApi.addPlaylist(user.id, playlistName);
       
        if (playlist.error) {
            return console.warn(user.error);
        }

        const tracks = this.props.items.map(x => x.uri);
        //TO DO split into chunks of less than 100, (more than 100 tracks cannot be added at once)
        const result = await SpotifyApi.addTracks(playlist.id, tracks);
        
        if (result.snapshot_id) {
            //success
            window.location.href = playlist.external_urls.spotify;
        }

    }
    render() {
        return (
            <Area>
                <Title>My Playlist</Title>
                <Input
                  value={this.state.playlist}
                  onChange={this.handleChange}
                  name="playlist"
                  placeholder="Name your playlist"
                />
                <Go onClick={this.addToPlaylist}>Create</Go>

                {this.props.items.length > 0 && <Title>Track list</Title>}
                <Results>
                    {
                        this.props.items.map((item) => {
                            const artist = item.artists.length > 0 ? item.artists[0].name : null;
                            return (
                                <RecommendedItem
                                  key={item.id}
                                >
                                    <SongName>{item.name}</SongName>

                                    {artist && <Artist>{artist}</Artist>}


                                </RecommendedItem>
                            );
                        })
                    }
                </Results>

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


const Results = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:flex-start;
`;


const RecommendedItem = styled.div`
    width:150px;
    margin:10px;  
    position:relative;  
    background:white;
    border:solid 1px black;
`;
const SongName = styled.div`
    width:100%;
    padding:8px;
    color:black;

`;

const Artist = styled.div`
    width:100%;
    padding:8px;
    color:black;
`;


const Input = styled.input`
    width:calc(100% - 30px);
    margin:10px auto;
    font-size:20px;
    padding:5px;
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

export default Added;
