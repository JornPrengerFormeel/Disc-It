import React from 'react';
import styled, { keyframes } from 'styled-components';
// TODO: Add font used in UI desgin
import LinkSpotify from './LinkSpotify';
import backgroundImage from '../../../img/album.jpg';

class GreetingPage extends React.Component {

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
            backgroundPositionX : `${(-this.state.mouse.offsetX / 3) + 200}px`,
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
                <CenterDisc>
                    <ContentContainer>
                        <p>
                            <b>Spot It</b>
                            {' '}
                            creates playlists based on artists you already love.
                        </p>
                        <p>Simple link your Spotify, customize your selection, and discover new artists!</p>
                        <LinkSpotify />
                    </ContentContainer>

                </CenterDisc>
            </Container>
        );
    }
}

const Container = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const BackgroundContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;


const BackgroundImage = styled.div`
  background: url(${props => props.src}) repeat-y; 
  height:150vh;
  width: 100%;
  background-size: cover;
  background-repeat:repeat;
  
`;

const CenterDisc = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 200px;
  box-sizing: border-box;

`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;


export default GreetingPage;
