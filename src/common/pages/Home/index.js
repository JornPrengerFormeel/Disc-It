import React, { Component } from 'react';
import './index.css';

import Container from 'react-bootstrap/Container';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourPick: 1,
            playlistCount: 1,
        };

        this.handleYourPickChange = this.handleYourPickChange.bind(this);
        this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleYourPickChange(event) {
        this.setState({ yourPick: event.target.value });
    }

    handlePlaylistChange(event) {
        this.setState({ playlistCount: event.target.value });
    }

    handleSubmit(event) {
        alert(`Your favorite flavor is: ${this.state.value}`);
        event.preventDefault();
    }


    render() {
        return (
            <div className="App">
                <Container className="Header" />
                <Container className="Body">
                    <h1>Pick your favorites</h1>
                    <Container className="inner">
                        <p>
            Here, we display from 3 to 10 (based on user display size) of the user top artists based on
            http://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
            Additionally, we provide a search above so the user can search any artist. We should provide a limit though, or the API consumption will rise quickly.


                        </p>
                    </Container>

                    <h2>Every pick of yours should generate picks from us</h2>
                    <Container className="inner">
                        <p>The phrasing could be better, but that's about it - Using http://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/ and for every artist the user picked we call this endpoint ( Which is why again, limited is good. I made a select with up to 10 options but more or less could be used)</p>
                    </Container>
                    <h3>How many songs do you want your playlist to have?</h3>
                    <Container className="inner">
                        <p>
              How any songs should the playlist have? Finally, it's time we put together all the data we collected and use http://developer.spotify.com/documentation/web-api/reference/playlists/. This time, we could gt a little loose with API limitations and maybe create playlists with up to 100 songs (Which is why I used a number input here instead of the select, like above)


                        </p>
                    </Container>
                </Container>
                <Container className="Footer" />
            </div>

        );
    }
}

export default App;
