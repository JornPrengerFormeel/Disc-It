import React from 'react';
import styled from 'styled-components';
import { GreetingPagePresenter } from './GreetingPagePresenter';

const LinkSpotify = props => (
    <LinkSpotifyBtn onClick={GreetingPagePresenter.linkButtonClicked}>
        Link Spotify
        {/* TODO */}
    </LinkSpotifyBtn>
);

const LinkSpotifyBtn = styled.button`
  margin: 1em 0;
  height: 56px;
  width: 300px;

  background: #212121;
  color: #EEE;

  border: none;
  border-radius: 9999px;
  
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
  
  cursor:pointer;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.25s;

  &:hover {
    color: #1bc156;
  }
`;

export default LinkSpotify;
