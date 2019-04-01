import React, { Component } from 'react';
import styled from 'styled-components';
import Router from './Router';
import NavFooter from './common/components/Navigation/NavFooter.js';


class App extends Component {
    state = {}

    render() {
        return (
            <React.Fragment>
                <Main>
                    <Router props={this.props} />
                    <NavFooter />
                </Main>
            </React.Fragment>
        );
    }
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(#1ed760, #159141);

  *::selection {
      color: #1ed760;
      background: #212121;
  }
`


export default App;
