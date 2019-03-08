import React, {Component} from 'react';
import styled from 'styled-components';

import {SpotifyApi} from '../../../api/spotify-api'


class Recommended extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recommendations : []
        }

        this.getRecommended = this.getRecommended.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //if seeds have changed then get recommendations
        if (prevProps.items !== this.props.items) {
            this.getRecommended();
        }
    }
    
    async getRecommended() {
        const items = this.props.items;
        const start = items.length >= 5 ? items.length - 5 : 0;
        const seeds = items.slice(start);
        const results = await SpotifyApi.recommendations(seeds);
        console.log(results);
        if (results.tracks) {
            this.setState({recommendations : results.tracks})
        }
    }


    selectSong = (index) => {
        //if first click play demo song
        //and show plus button

        //if second click add to added list

        const recommendations = [...this.state.recommendations];
        const item = {...recommendations[index]};
        if (item.touched) {
            return this.props.selectItem('added', item);
        }
        item.touched = true;
        
        const audio = document.getElementById('audio');
        audio.pause();

        if (item.preview_url) {
            audio.src = item.preview_url;
            audio.play();
        }
        recommendations[index] = item;

        this.setState({
            ...this.state,
            recommendations : recommendations
        })
    }

    render() {
        const items = this.props.items;
        const start = items.length >= 5 ? items.length - 5 : 0;
        const last5 = items.slice(start);
        return (
            <Area>
                <Audio id = "audio"></Audio>
                <Title>
                    Seeds
                </Title>
                <Results>
                    {
                        
                        last5.map((data)=>{
                            const item = data.item;
                            const img = item.images.length < 2 ? null : item.images[1].url;
                            return (
                                <Item 
                                    key={item.id}
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
                

                {
                    this.state.recommendations.length > 0 &&
                    <Title>Recommended Tracks</Title>   
                }
                 

                
                <Results>
                    {
                        this.state.recommendations.map((item, index)=>{
                            const artist = item.artists.length > 0 ? item.artists[0].name : null;
                            return (
                                <RecommendedItem 
                                    key={item.id}
                                    onClick={()=>{this.selectSong(index)}}
                                    touched = {item.touched}
                                >
                                    <SongName>{item.name}</SongName>
                                    
                                    {artist && <Artist>{artist}</Artist>}

                                    {
                                        item.touched &&
                                        <Plus>+</Plus>
                                    }
                                </RecommendedItem>
                            )
                        })
                    }
                </Results>

            </Area>
        )
    }
}
const Audio = styled.audio`display:none;`;


const Area = styled.div`
    width:1000px;
    margin:0 50px;
    min-height:300px;
    background:#eee;
    display:flex;
    flex-direction:column;
`;


const Title = styled.h1`
   
    padding:25px;
    border-bottom:dashed 6px black;
`

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

    ${props => props.touched && 'background:#2f2f2f; color:white;'}

    &:hover {
        background:#2f2f2f;
        color:white;
    }
`;
const SongName = styled.div`
    width:100%;
    padding:8px;
    color:inherit;

`;

const Artist = styled.div`
    width:100%;
    padding:8px;
    color:inherit;
`;

const Plus = styled.div`
    position:absolute;
    top:10px;
    right:10px;
    width:20px;
    height:20px;
    background:green;
    border-radius:50%;
    color:white;
    text-align:center;
    line-height:20px;
`;

export default Recommended;