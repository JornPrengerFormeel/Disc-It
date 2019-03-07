import React, {Component} from 'react';
import styled from 'styled-components';

import {SpotifyApi} from '../../../api/spotify-api'
import Results from './results';
import Selected from './selected';
import Recommended from './recommended';

class Discover extends Component {
    constructor(props) {
        super();

        this.state = {
            query : '',
            results : [],
            selected : [],
            recommendations : []
        }

        this.search = this.search.bind(this);
        this.getRecommended = this.getRecommended.bind(this);
    }

    handleChange =(e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    async search() {
        const artist = this.state.query.trim();
        if (artist.length < 1) return;
        const results = await SpotifyApi.search(artist, 'artist', 10, 0);
        //const results = await data.json();
        if (results.artists) {
            this.setState({results : results.artists.items})
        }

    }

    selectItem = (type, item) => {
        const selected = [...this.state.selected];
        if (!selected.some( s => (s.type === type && s.item === item) )) {
          selected.push({
              type : type,
              item : item
          })
          this.setState({
              selected : selected
          })
        }
    }

    async getRecommended() {
        const selected = this.state.selected;
        const results = await SpotifyApi.recommendations(selected);

        if (results.tracks) {
            this.setState({recommendations : results.tracks})
        }
    }

    render() {
        if (this.state.recommendations.length > 0) {
            return <Area><Recommended recommendations={this.state.recommendations} /></Area>
        }
        return (
            <Area>
                <Go onClick={this.getRecommended}>Get Recommended</Go>
                <Selected selected={this.state.selected} />
                <Input
                    value = {this.state.query}
                    name = "query"
                    onChange={this.handleChange}
                />
                <Go onClick={this.search}>Search</Go>

                <Results
                    results={this.state.results}
                    selectItem = {this.selectItem}
                />

            </Area>
        )
    }
}

const Area = styled.div`
    width:1090px;
    max-width:100%;
    margin:auto;
    min-height:300px;
    background:#eee;

    display:flex;
    flex-direction:column;
`;

const Input = styled.input`
    width:400px;
    max-width:100%;
    margin:25px auto;
`;

const Go = styled.div`
    padding:25px;
    display:inline-block;
    margin:0 auto;
    background:lightgreen;
    color:black;

    &:hover {
        background:darkgreen;
    }
`;






export default Discover;
