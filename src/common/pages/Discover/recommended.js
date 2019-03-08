import React, {Component} from 'react';
import styled from 'styled-components';

import {SpotifyApi} from '../../../api/spotify-api'

import sound from '../../../img/mute-unmute.png';

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
        console.log(items);
        if (items.length === 0) {
            this.setState({recommendations : []})
            return;
        }

        const start = items.length >= 5 ? items.length - 5 : 0;
        const seeds = items.slice(start);
        const results = await SpotifyApi.recommendations(seeds);
        console.log(results);
        if (results.tracks) {
            this.setState({recommendations : results.tracks})
        }
    }

    addSong = (item) => {
        this.props.selectItem('added', item);
    }

    playDemo = (item) => {
        const audio = document.getElementById('audio');
        audio.pause();
        audio.src = item.preview_url;
        audio.play();
    }
    

    removeSeed =(index) => {
        const seeds = [...this.props.items];
        seeds.splice(index,1);
        this.props.updateResults('seeds', seeds);
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
                        
                        last5.map((data, index)=>{
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

                                    <Remove onClick={()=>{this.removeSeed(index)}}>X</Remove>
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
                                    touched = {item.touched}
                                >
                                    <SongName>{item.name}</SongName>
                                    
                                    {artist && <Artist>{artist}</Artist>}

                                    {
                                        item.preview_url &&
                                        <Demo
                                            onClick={()=>{this.playDemo(item)}}
                                        />
                                    }
                                    <Plus onClick={()=>{this.addSong(item)}}>+</Plus>
                                    
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
    margin:0 12px;
    min-height:300px;
    background:#eee;
    display:flex;
    flex-direction:column;
`;


const Title = styled.h1`
   
    padding:25px;
    border-bottom:dashed 6px black;
`

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
    width:calc(20% - 20px);
    height:130px;
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








const Results = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
`;




const RecommendedItem = styled.div`
    width:150px;
    margin:10px;  
    position:relative;  
    background:white;
    border:solid 1px black;
    cursor:pointer
    font-size:14px;
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
    border-top: dashed 3px black;
    width:100%;
    padding:8px;
    color:inherit;
`;

const Plus = styled.div`
    position:absolute;
    top:-10px;
    right:-10px;
    width:20px;
    height:20px;
    background:green;
    border-radius:50%;
    color:white;
    text-align:center;
    line-height:20px;
`;

const Demo = styled(Plus)`
    right:auto;
    left:-10px;
    background:black;
    border:solid 1px black;
    background-image:url(${sound});
    background-repeat:no-repeat;
    background-size:100%;
    background-position-y: 100%;
`;

const Remove = styled(Plus)`
    background:red;
`;

export default Recommended;