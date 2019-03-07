import React from 'react';
import styled from 'styled-components';

const Results = (props) => {
    const results = props.recommendations;
    return (
        <ResultsArea>
            {
                results.map((item)=>{
                    
                        
                    return (
                        <Item 
                            key = {item.id}
                        >
                            
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
    position:relative;
    margin:10px 0;
`;




const Name = styled.div`
   
    width:100%;
    padding:8px;
    background:white;
    color:black;
    text-align:center;
`;


export default Results;