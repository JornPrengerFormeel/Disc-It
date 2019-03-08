import React, {Component} from 'react';
import styled from 'styled-components';



import Search from './search';
import Recommended from './recommended';
import Added from './added';



class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searched : [],
            seeds : [],
            added : []
        }

        
    }
    

   
    updateResults = (type, results) => {
        this.setState({
            [type] : results
        })
    }
    

    selectItem = (type, item) => {
        const current = [...this.state[type]];
        current.push(item);
        this.setState({
            [type]:current
        });
    }

    

    render() {

        return (
            <Area>
                <Search 
                    updateResults = {this.updateResults}
                    selectItem = {this.selectItem}
                    items = {this.state.searched}
                />

                <Recommended 
                    updateResults = {this.updateResults}
                    selectItem = {this.selectItem}
                    items = {this.state.seeds}
                />

                <Added 
                    items ={this.state.added}
                />
            
            </Area>
        )
    }
}

const Area = styled.div`
    width:1890px;
    max-width:100%;
    margin:auto;
    min-height:300px;
    
    display:flex;
    justify-content:center;
    position:relative;
`;








export default Discover;