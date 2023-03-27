const appClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const redirectUri = "http://localhost:3000/";
let accessToken = null;
let isAuthorized = false;

const Spotify = {
    getAccessToken() {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${appClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    },

    isTokenExists() {
        if (accessToken) {
            return true;
        } else {
            let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                let expiresIn = expiresInMatch[1];
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return  true;    
            } else return false;
        }
    },

    search(userSearchTerm) {
       let tracks = fetch(`https://api.spotify.com/v1/search?q=${userSearchTerm}&type=track`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
        ).then((response)=> {
            if (response.ok) {
                return response.json();
            }
        }).then((jsonResponse)=>{
            if (!jsonResponse) return [{}];
            let tracks = jsonResponse.tracks.items.map((track)=> ({
                        id:track.id,
                        name:track.name,
                        artist:track.artists[0].name,
                        album:track.album.name,
                        uri: track.uri
                    }
            ));
            console.log(tracks);
            return tracks;
        })
        return tracks;
    },

    async savePlaylist(playlistName, arrayOfTracksUri) {
        if (!playlistName && !arrayOfTracksUri) {
            return;
        }
        let accessTokenVariable = accessToken;
        let headers = {
            Authorization:`Bearer ${accessToken}`
        };
        let userId = await fetch(`https://api.spotify.com/v1/me`, { 
                headers: headers}
            ).then((response)=> {
                if (response.ok) {
                    return response.json();
                }
            }).then((jsonResponse)=>{
                return jsonResponse.id;
            });

        console.log(userId);
        let playlistId = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers, 
                method:'POST',
                body: JSON.stringify({
                    "name": playlistName,
                  })
            }).then((response)=> {
                if (response.ok) {
                    return response.json();
                }
            }).then((jsonResponse)=>{
                console.log(jsonResponse);
                return jsonResponse.id;
            });
        
        let addTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json"}, 
                method:'POST',
                body: JSON.stringify({uris: arrayOfTracksUri})
            }).then((response)=> {
                if (response.ok) {
                    return response.json();
                }
            }).then((jsonResponse)=>{
                console.log('ok');
            });    
    }
};

export { Spotify };
