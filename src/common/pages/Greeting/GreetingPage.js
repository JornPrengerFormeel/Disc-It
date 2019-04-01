import React from 'react';
import styled from 'styled-components';
import LinkSpotify from './LinkSpotify';

import bg from '../../../img/bg-c-transparent-test.png';
import tile from '../../../img/tile.png';

class GreetingPage extends React.Component {
    componentDidMount() {
        // check current localstorage and see if tokens have expired, if not redirect to discover
        if (localStorage.getItem('access_token')) {
            const expiry = localStorage.getItem('expiry_epoch');
            if (expiry && expiry > new Date().getTime()) {
                this.props.history.push('/discover');
            }
        }
    }

    render() {
        return (
            <Wrapper>
                <ContentContainer>

                    <h1>
                      <span className="logo">Disc-It</span>
                      &nbsp; creates playlists based on artists you love.
                    </h1>

                    <h3 className="secondary_text">
                      <strong>Link</strong> your Spotify, &nbsp;
                      <strong>Customize</strong> your selection, &nbsp;
                      <strong>Discover</strong> new artists!
                    </h3>

                    <LinkSpotify />
                </ContentContainer>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  background: url(${bg}), linear-gradient(to right, #1ed760 50%, #159141), url(${tile});
  background-blend-mode: darken, darken, darken;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: contain, contain, cover;
  background-position: right;

  flex: 1 1 auto;
    @media (max-width: 768px) {
        background: linear-gradient(#1ed760, #159141);
     }
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 10vw 0 0 8vh;
    transition: padding .25s ease-in-out;



    h1 {
        font-family: 'Raleway', Helvetica,Arial,sans-serif;
        text-shadow: 1px 3px 2px rgba(0,0,0,0.2);
        font-size: 38px;
        font-weight: 900;
        line-height: 1.5;
        color: #212121;
        transition: font-size .25s ease-in-out;
    }

    h3 {
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
      text-shadow: 1px 3px 2px rgba(0,0,0,0.2);
    }

    .logo {
      font-size: 60px;
      font-family: 'Archivo Black', Helvetica, Arial, sans-serif;
    }

    .secondary_text {
      margin: 15px 0;
    }

    // 4K
    @media (min-width: 2560px) {
        h1 {
            font-size: 84px;
        }
     }

    // Tablet
    @media (max-width: 1023px) {
        h1 {
            font-size: 32px;
        }
     }

    // Mobile
    @media (max-width: 768px) {
        width: 100%;
        padding: 48px 48px 0 48px;
        align-items: center;
        justify-content: center;
        h1 {
            font-size: 32px;
        }
     }
`;


export default GreetingPage;
