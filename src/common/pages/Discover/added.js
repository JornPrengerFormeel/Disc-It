import React, {Component} from 'react';
import styled from 'styled-components';


class Added extends Component {

    

    render() {
        return (
            <Area>
                <Title>My Playlist</Title>
                <Results>
                    {
                        this.props.items.map((item)=>{
                            const artist = item.artists.length > 0 ? item.artists[0].name : null;
                            return (
                                <RecommendedItem 
                                    key={item.id}
                                >
                                    <SongName>{item.name}</SongName>
                                    
                                    {artist && <Artist>{artist}</Artist>}

                                    
                                </RecommendedItem>
                            )
                        })
                    }
                </Results>

            </Area>
        )
    }
}



const Title = styled.h1`
   
    padding:25px;
    border-bottom:dashed 6px black;
`
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



export default Added;