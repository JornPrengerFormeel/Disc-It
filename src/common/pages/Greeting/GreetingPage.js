import React from 'react';
import styled from 'styled-components';


// TODO: Add font used in UI desgin
import LinkSpotify from './LinkSpotify';


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
        );
    }
}


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
