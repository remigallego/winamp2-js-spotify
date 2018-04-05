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
  this.state = {
    input: "spotify:user:remifasol:playlist:43uS6JpETpdcZxTtK7cxCR"
  }
}

handleScriptLoad()  {


}

handleScriptError(e) {
  console.log(e);

}

handleChange(e) {
  e.preventDefault();
  this.setState({input: e.target.value})
}

handleSubmit(e) {
  e.preventDefault()
  this.props.addTracksFromPlaylist(e.target[0].value)
}

render() {
  return(
    <div>
      {/*       DEBUG       
      <button onClick={() => this.props.removeAllTracks()}>Remove All Tracks</button>
      <button onClick={() => this.props.addTrackFromURI("4rzfv0JLZfVhOhbSQ8o5jZ")}>Add Track Odiseo - Api</button>
      <button onClick={() => this.props.addTrackFromURI("1ngKxzxHTfZ2l5IU3lq2V8")}>Add Track Meteor - Arctec Gemini</button>
      <button onClick={() => this.props.addTracksFromPlaylist("spotify:user:remifasol:playlist:43uS6JpETpdcZxTtK7cxCR")}>Add Tracks from ./progandsynths playlist</button>
      <form onSubmit={(e) => this.handleSubmit(e)}>
      <input value={this.state.input} onChange={(e) => this.handleChange(e)} style={{width: "700px"}}>
      </input></form>
      */}
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
