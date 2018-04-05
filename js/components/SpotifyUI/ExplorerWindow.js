import React from "react";
import { connect } from "react-redux";

class ExplorerWindow extends React.Component {
    renderTracks() {
        let playlist = this.props.playlist;
        
        return Object.keys(playlist.tracks).map((key, index) => {
            if(playlist.tracks[key].selected)
                return <p className="selected">{playlist.tracks[key].defaultName}</p>
            else
                return <p>{playlist.tracks[key].defaultName}.mp3</p>
        })
    }
    render() {
        return(
            <div className="explorer-window">
                <div className="explorer-title"><p>Winampify</p></div>
                <div className="explorer-toolbar">
                    <div className="explorer-toolbar-imgcontainer">
                    </div>
                </div>
                <div className="explorer-content">
                  {this.renderTracks()}
                </div>
                <div className="explorer-foot"></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    playlist: state.playlist,
});

export default connect(mapStateToProps)(ExplorerWindow);