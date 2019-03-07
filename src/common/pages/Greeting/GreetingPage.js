import React from 'react';
import styled, { keyframes } from 'styled-components';
// TODO: Add font used in UI desgin
import LinkSpotify from './LinkSpotify';
import backgroundImage from '../../../img/album.jpg';

class GreetingPage extends React.Component {
  test = () => { console.log('hi'); };

  render() {
      return (
          <Container>
              <BackgroundContainer>
                  <BackgroundImage src={backgroundImage} />
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
  width: 100% !important;
  max-width: 100% !important;
`;

const BackgroundContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;


const slide = keyframes`
  0%{
    transform: translate3d(0, 0, 0);
  }
  100%{
    transform: translate3d(0, -300vh, 0);
  }
`;
const BackgroundImage = styled.div`
  background: url(${props => props.src}) repeat-y; 
  height: 300vh;
  background-size: contain;
  animation: ${slide} 120s linear infinite;
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
