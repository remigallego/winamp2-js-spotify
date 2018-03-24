import React from "react";
import Script from 'react-load-script'
import { connect } from "react-redux";
import token from '../access_token.js'

import {
  s_updatePlayerObject, 
  s_playRandomURI,
  removeAllTracks,
  addTrackFromURI,
  addTracksFromPlaylist
} from "../actionCreators.js"

class SpotifyWebPlaybackAPI extends React.Component {
constructor(props) {
  super(props)
  this.handleScriptLoad = this.handleScriptLoad.bind(this)
}

handleScriptLoad()  {
  const player = new Spotify.Player({             // Spotify is not defined until
    name: 'Winampify',                   // the script is loaded in
    getOAuthToken: cb => { cb(token) }
  })

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    this.props.s_updatePlayerObject(player)
  });

  player.connect()

}

handleScriptError(e) {
  console.log(e);

}


handleSubmit(e) {
  e.preventDefault()
  this.props.addTracksFromPlaylist(e.target[0].value)
}


render() {
  return(
    <div>
    <Script
      url="https://sdk.scdn.co/spotify-player.js"
      onError={this.handleScriptError}
      onLoad={this.handleScriptLoad}
    />

    {/*       DEBUG       */}
    <button onClick={() => this.props.s_playRandomURI()}>Play Random Track</button>
    <button onClick={() => this.props.removeAllTracks()}>Remove All Tracks</button>
    <button onClick={() => this.props.addTrackFromURI("4rzfv0JLZfVhOhbSQ8o5jZ")}>Add Random Track</button>
    <button onClick={() => this.props.addTrackFromURI("1ngKxzxHTfZ2l5IU3lq2V8")}>Add Random Track 2</button>
    <button onClick={() => this.props.addTracksFromPlaylist("spotify:user:remifasol:playlist:43uS6JpETpdcZxTtK7cxCR")}>Add Tracks from Random Playlist</button>
    <form onSubmit={(e) => this.handleSubmit(e)}>
    <input value="spotify:user:remifasol:playlist:43uS6JpETpdcZxTtK7cxCR" readOnly style={{width: "700px"}}>
    </input></form>
   </div>
  )
}
}

const mapStateToProps = state => ({
  getOAuthToken: state.media.getOAuthToken,
  id: state.media.id
});

const mapDispatchToProps = {
  s_updatePlayerObject,
  s_playRandomURI,
  removeAllTracks,
  addTrackFromURI,
  addTracksFromPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyWebPlaybackAPI);
