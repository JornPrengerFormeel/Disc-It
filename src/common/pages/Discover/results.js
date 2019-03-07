import React from 'react';
import styled from 'styled-components';

const Results = (props) => {
    const results = props.results;
    return (
        <ResultsArea>
            {
                results.map((item)=>{
                    let img = null;
                    if (item.images !== undefined) {
                        img = item.images.length < 2 ? null : item.images[1].url;
                    }
                        
                    return (
                        <Item 
                            key = {item.id}
                            onClick={()=>{props.selectItem('artist', item)} }   
                        >
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
        </ResultsArea>
    )
}



const ResultsArea = styled.div`
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


export default Results;