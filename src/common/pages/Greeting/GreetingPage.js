import React from "react";
import './GreetingPage.css';
//TODO: Add font used in UI desgin

class LinkSpotify extends React.Component {
  render() {
    return (
      <button className="link-spotify-button">
        Link Spotify
        {/* TODO */}
      </button>
    );
  }
}

class GreetingPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="background-container">
        <div className="background-image"></div>
        </div>
        <div className="center-disc">
          <div className="content-container">
            <p><b>Spot It</b> creates playlists based on artists you already love.</p>
            <p>Simple link your Spotify, customize your selection, and discover new artists!</p>
            <LinkSpotify />
          </div>

        </div>
      </div>
    );
  }
}

export default GreetingPage;