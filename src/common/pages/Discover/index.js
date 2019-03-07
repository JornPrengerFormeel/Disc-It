import React, {Component} from 'react';
import styled from 'styled-components';

import {SpotifyApi} from '../../../api/spotify-api'

class Discover extends Component {
    constructor(props) {
        super();

        this.state = {
            query : '',
            results : []
        }

        this.search = this.search.bind(this);
    }
    

   

    handleChange =(e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    async search() {
        const artist = this.state.query;
        if (artist.length < 1) return;
        const results = await SpotifyApi.search(artist, 'artist', 10, 0);
        //const results = await data.json();
        console.log(results);
        if (results.artists) {
            this.setState({results : results.artists.items})
        }
        
    }

    render() {
        return (
            <Area>
                <Input 
                    value = {this.state.query}
                    name = "query"
                    onChange={this.handleChange}
                />
                <Go onClick={this.search}>Search</Go>
                <Results>
                    {
                        this.state.results.map((item)=>{
                            const img = item.images.length < 2 ? null : item.images[1].url;
                            return (
                                <Item key = {item.id}>
                                    <ImageOuter>
                                        {img ? 
                                        <Image src={item.images[1].url} />
                                        :
                                        <NoImage>No Image</NoImage>
                                        }
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

const Results = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
`;

const Item = styled.div`
    width:300px;
    height:300px;
    position:relative;
    margin:10px 0;
`;

const ImageOuter = styled.div`
    width:100%;
    height:100%;
`;

const Image = styled.img`
    width:100%;
    height:100%;
    display:block;
`;

const NoImage = styled.div`
    width:100%;
    height:100%;
    text-align:center;
    line-height:300px;
    font-size:1rem;
    color:gray;
`;

const Name = styled.div`
    position:absolute;
    bottom:0;
    width:100%;
    padding:8px;
    background:white;
    color:black;
    text-align:center;
`;


export default Discover;