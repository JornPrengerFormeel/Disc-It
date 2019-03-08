import React, { Component } from 'react';
import styled from 'styled-components';

import { SpotifyApi } from '../../../api/spotify-api';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };

        this.search = this.search.bind(this);
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async search() {
        const artist = this.state.query.trim();
        if (artist.length < 1) return;
        const results = await SpotifyApi.search(artist, 'artist', 10, 0);
        // const results = await data.json();

        if (results.artists) {
            this.props.updateResults('searched', results.artists.items);
        }
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
                <Title>Search Artists</Title>
                <Input
                  value={this.state.query}
                  onChange={this.handleChange}
                  name="query"
                  placeholder="Search artists"
                />
                <Go onClick={this.search}>Search</Go>

                <Results>
                    {
                        this.props.items.map((item) => {
                            const img = item.images.length < 2 ? null : item.images[1].url;
                            return (
                                <Item
                                  key={item.id}
                                  onClick={() => { this.addItem(item); }}
                                >
                                    <ImageOuter>
                                        <Image src={img} />
                                    </ImageOuter>
                                    <Name>{item.name}</Name>
                                </Item>
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


const Title = styled.h1`
   
    padding:25px;
    border-bottom:dashed 6px black;
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

const Results = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
`;

const Name = styled.div`
    position:absolute;
    bottom:0;
    width:100%;
    padding:8px;
    color:black;
    background:white;
`;
const Image = styled.img`
    display:block;
    width:100%;
    height:100%;
    object-fit:cover;

    transition:all 0.3s ease-in;
`;
const Item = styled.div`
    width:calc(33% - 20px);
    height:150px;
    margin:10px;  
    position:relative;  

    &:hover ${Name} {
        color:white;
        background:#2f2f2f;
    }

    &:hover ${Image} {
        transform:scale(1.1);
    }
`;

const ImageOuter = styled.div`
    width:100%;
    height:100%;
    overflow:hidden;
`;


export default Search;
