import React from 'react';
import styled from 'styled-components';
import { GreetingPagePresenter } from "./GreetingPagePresenter";

const LinkSpotify = props => (
    <LinkSpotifyBtn onClick={GreetingPagePresenter.linkButtonClicked} >
        Link Spotify
        {/* TODO */}
    </LinkSpotifyBtn>
);

const LinkSpotifyBtn = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  background: black;
  color: white;
  border-radius: 15px;
  margin-top: 10px;
  font-size: 80%;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.25s;
  cursor:pointer;

  &:hover {
    background: #1ed760;
  }
`;

export default LinkSpotify;
