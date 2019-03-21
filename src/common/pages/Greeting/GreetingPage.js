import React from 'react';
import styled from 'styled-components';
import LinkSpotify from './LinkSpotify';

import bg from '../../../img/bg-c.jpg';

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
                    <h1><span className="logo">Disc It</span> creates playlists for you based on artists you already love.</h1>
                    <h1>Easy as 1 2 3: Link your Spotify, customize your selection, and discover new artists!</h1>
                    <LinkSpotify />
                </ContentContainer>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  background: linear-gradient(to bottom right, #1ed760 66%, #1bc156), url(${bg});
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  flex: 1 1 auto;
    @media (max-width: 768px) {
        background: linear-gradient(#1ed760, #1bc156);
     }
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 10vw 0 0 8vh;
    transition: padding .25s ease-in-out;

    h1 {
        font-family: Helvetica,Arial,sans-serif;
        font-size: 36px;
        font-weight: 900;
        line-height: 1.5;
        color: #212121;
        transition: font-size .25s ease-in-out;
    }

    span.logo {
        border: 2px solid #212121;
        border-right: none;
        border-bottom: none;
        padding-left: 8px;
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
