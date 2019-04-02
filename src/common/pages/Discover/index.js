import React, { Component } from 'react';
import styled from 'styled-components';

import Search from './search';
import Recommended from './recommended';
import Added from './added';

import tile from '../../../img/tile.png';


class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searched: [],
            seeds: [],
            added: [],
        };
    }


    updateResults = (type, results) => {
        // unique results

        this.setState({
            [type]: results,
        });
    }


    selectItem = (type, item) => {
        const current = [...this.state[type]];
        current.push(item);
        this.setState({
            [type]: current,
        });
    }


    render() {
        return (
            <Area>

                <Search
                  updateResults={this.updateResults}
                  selectItem={this.selectItem}
                  items={this.state.searched}
                  seeds={this.state.seeds} />

                

            </Area>
        );
    }
}

const Area = styled.div`
    position:relative;
    height: 100vh;
    width:100%;

    display:flex;
    align-items: center;
    justify-content:center;

    background: linear-gradient(to right, #1ed760 50%, #159141), url(${tile});
    background-blend-mode: darken, darken;
    background-repeat: no-repeat, no-repeat;
    background-size: contain, cover;
    background-position: right;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


export default Discover;
