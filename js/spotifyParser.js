

export const getURIDisplayName = (state, URI) => {

}

export const parseTrackURI = (access_token, URI, callback) => {
          fetch(`https://api.spotify.com/v1/tracks/${URI}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`
            },
          }).then(response => response.json())
          .then(json => {
              callback({
                artist: json.artists[0].name,
                name: json.name,
                duration: json.duration_ms
              })
          });
}

/* @params 
   <playlist> should be in this form: spotify:user:xxxx:playlist:xxxx
*/
export const parseTracksPlaylist = (access_token, playlist, callback) => { 
    let offset = 0;
    let user;
    let URI;
    let tracks = []
    let p = playlist.split(":")
    if(p.length === 5) {
         user = p[2]
         URI = p[4]
    }
    if(p.length === 4) {
         user = p[1]
         URI = p[3]
    }
    if(p.length === 3)
    {   
        tracks = [];
        URI = p[2];
        fetchAlbum(access_token, tracks, URI, (err, res) => callback(err, res));
    }
    else 
        fetchplaylist(access_token, tracks, user, URI, offset, (err, res) => callback(err, res))
}

export const fetchplaylist = (access_token, tracks, user, URI, offset, callback)  => {
    fetch(`https://api.spotify.com/v1/users/${user}/playlists/${URI}/tracks?offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => response.json())
      .then(json => {
          let items = json.items;
          if((items[0].track.id) !== null)
           {     
               for(let i = 0; i < items.length ; i++)
                    {   
                        if((items[i].track) !== null)
                            tracks.push({
                                artist: items[i].track.artists[0].name,
                                duration: items[i].track.duration_ms/1000,
                                name: items[i].track.name,
                                uri: items[i].track.id, 
                                index: i+offset
                            })
                    }
                    if(tracks.length === offset + 100)
                        fetchplaylist(access_token, tracks, user, URI, offset+100, (err, res) => callback(err, res))
                    else
                        callback(null, tracks)
            }
          else
            callback(tracks)
       }).catch((err)=>{
           console.log(err)
        })
}

export const fetchAlbum = (access_token, tracks, URI, callback)  => {
    fetch(`https://api.spotify.com/v1/albums/${URI}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => response.json())
      .then(json => {
          let albumTracks = json.tracks.items;
          if((albumTracks[0].id) !== null)
           {     
               for(let i = 0; i < albumTracks.length ; i++)
                    {       
                            if(albumTracks[i].artists !== undefined)
                            tracks.push({
                                artist: albumTracks[i].artists[0].name,
                                duration: albumTracks[i].duration_ms/1000,
                                name: albumTracks[i].name,
                                uri: albumTracks[i].id, 
                                index: i
                            })
                    }
                        callback(null, tracks)
            }
       }).catch((err)=>{
           callback(err)
        })
}