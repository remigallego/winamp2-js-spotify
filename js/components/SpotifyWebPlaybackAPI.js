import React from "react";
import Script from 'react-load-script'
import { connect } from "react-redux";

import {
  createPlayerObject, 
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
      {/*       DEBUG       */}
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
  createPlayerObject,
  removeAllTracks,
  addTrackFromURI,
  addTracksFromPlaylist,
  ready: () => {
    dispatch({type: 'READY'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyWebPlaybackAPI);
