import React, {Component} from 'react';
import styled from 'styled-components';

import {SpotifyApi} from '../../../api/spotify-api'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : ''
        }

        this.search = this.search.bind(this);
    }
   

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    async search() {
        const artist = this.state.query.trim();
        if (artist.length < 1) return;
        const results = await SpotifyApi.search(artist, 'artist', 10, 0);
        //const results = await data.json();
        
        if (results.artists) {
            this.props.updateResults('searched', results.artists.items);
        }
    }

    addItem =(item) => {
        const data = {
            type : 'artist',
            item : item
        }
        this.props.selectItem('seeds', data);
    }

    render() {
        return (
            <Area>
                <Input 
                    value={this.state.query}
                    onChange={this.handleChange}
                    name="query"
                    placeholder="Search artists"
                />
                <Go onClick={this.search}>Search</Go>

                <Results>
                    {
                        this.props.items.map((item)=>{
                            const img = item.images.length < 2 ? null : item.images[1].url;
                            return (
                                <Item 
                                    key={item.id}
                                    onClick={()=>{this.addItem(item)}}
                                >
                                    <ImageOuter>
                                        <Image src={img} />
                                    </ImageOuter>
                                    <Name>{item.name}</Name>
                                </Item>
                            )
                        })
                    }
                </Results>

            </Area>
        )
    }
}

const Area = styled.div`
    width:500px;
    margin:0 50px;
    min-height:300px;
    background:#eee;
    display:flex;
    flex-direction:column;
`;

const Input = styled.input`
    width:100%;
    font-size:20px;
`;

const Go = styled.button`
    padding:10px;
    background:lightgreen;
`;

const Results = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:flex-start;
`;

const Item = styled.div`
    width:150px;
    height:150px;
    margin:10px;  
    position:relative;  
`;

const ImageOuter = styled.div`
    width:100%;
    height:100%;
    object-fit:cover;
`;

const Image = styled.img`
    display:block;
    width:100%;
    height:100%;
`;

const Name = styled.div`
    position:absolute;
    bottom:0;
    width:100%;
    padding:8px;
    color:black;
    background:white;
`;

export default Search;