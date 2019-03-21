import React, { Component } from 'react';
import styled from 'styled-components';

import Router from './Router';

import NavFooter from './common/components/Navigation/NavFooter.js';
//import backgroundImage from './img/album.jpg';


class App extends Component {
    state = {
        mouse: {
            offsetX: 0,
            offsetY: 0,
        },
    }

    mouseMove = (e) => {
        let mouse = this.state.mouse;
        mouse = {
            offsetX: e.nativeEvent.offsetX,
            offsetY: e.nativeEvent.offsetY,
        };

        this.setState({
            mouse,
        });
    }

    getBackgroundStyle() {
        return {
            backgroundPositionX: `${(-this.state.mouse.offsetX)}px`,
            backgroundPositionY: `${-this.state.mouse.offsetY}px`,
        };
    }


    render() {
        return (
            <React.Fragment>
                {/*<Container>
                    <BackgroundContainer>
                        <BackgroundImage
                          //onMouseMove={this.mouseMove}
                          src={backgroundImage}
                          style={this.getBackgroundStyle()}
                        />
                    </BackgroundContainer>
                </Container>*/}
                <Main>
                    <Router props={this.props} />

                    <NavFooter />
                </Main>
            </React.Fragment>


        );
    }
}

const Container = styled.div`
  //height: 100vh;
  //width: 100%;
  //margin: 0;
  //padding: 0;  
  //position:fixed;
`;

const BackgroundContainer = styled.div`
  height: 100%;
  width:100%;
  overflow: hidden;
  position:absolute;
`;


const BackgroundImage = styled.div`
  background: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${props => props.src}) repeat-y;
  height:150vh;
  width: 100%;
  background-size: cover;
  background-repeat:repeat;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;

  *::selection {
      color: #1ed760;
      background: #212121;
  }
`


export default App;
