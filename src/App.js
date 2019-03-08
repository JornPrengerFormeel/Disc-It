import React, {Component} from 'react';
import styled from 'styled-components';

import Router from './Router';

import backgroundImage from './img/album.jpg';


class App extends Component {
    state = {
        mouse : {
            offsetX : 0,
            offsetY : 0
        }
    }

    mouseMove = (e) => {
        let mouse = this.state.mouse;
        mouse = {
            offsetX : e.nativeEvent.offsetX,
            offsetY : e.nativeEvent.offsetY
        } 

        this.setState({
            mouse : mouse
        })
    }

    getBackgroundStyle() {
        return {
            backgroundPositionX : `${(-this.state.mouse.offsetX)}px`,
            backgroundPositionY : `${-this.state.mouse.offsetY}px`,
        }
    }


    render() {
        return (

            <Container>
                <BackgroundContainer>
                    <BackgroundImage 
                        onMouseMove = {this.mouseMove}
                        src={backgroundImage}
                        style = {this.getBackgroundStyle()}
                    />
                </BackgroundContainer>
    
            
                <Router props={this.props} />
    
    
            </Container>
    
    
        );
    }
    
}


const Container = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  position:fixed;
`;

const BackgroundContainer = styled.div`
  height: 100%;
  width:100%;
  overflow: hidden;
  position:absolute;
`;


const BackgroundImage = styled.div`
  background: url(${props => props.src}) repeat-y;
  height:150vh;
  width: 100%;
  background-size: cover;
  background-repeat:repeat;
`;



export default App;