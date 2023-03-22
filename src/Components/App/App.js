import './App.css';
import React, { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import { Spotify } from '../../util/Spotify'
import Authorization from '../Authorization/Authorization'

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('anystring');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  //const [isAuthorized, setIsAuthorized] = useState(false);
  const isAuthorized = Spotify.isTokenExists();

    const addTrack = (track) => {
      if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      }
      setPlaylistTracks((prev) => 
            [
              ...prev,
              track
            ]);
    };

    const removeTrack = (trackToRemove) => {
      setPlaylistTracks((prev)=>prev.filter((track)=> track.id !== trackToRemove.id));
    }

    const updatePlaylistName = (newName) => {
      setPlaylistName(newName);
    }

    const savePlaylist = () => {
      let trackURIs = playlistTracks.map((track)=>"spotify:track:"+track.id);
      console.log(trackURIs);
      Spotify.savePlaylist(playlistName, trackURIs);
    }

    const search = async (term) => {
      console.log(term);
      if (isAuthorized == true) {
      let results = await Spotify.search(term);
      setSearchResults(results);
      Spotify.savePlaylist();
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
      }
    }

  return (
    <> 
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      {isAuthorized 
        ? <div className="App">
            <SearchBar onSearch={search} />
            <div className="App-playlist">
              <SearchResults searchResults={searchResults} 
                            onAdd={addTrack}
                              />
              <Playlist playlistName={playlistName} 
                        playlistTracks={playlistTracks} 
                        onRemove={removeTrack}
                        onNameChange={updatePlaylistName}
                        onSave={savePlaylist} />
            </div>
          </div>
        : <Authorization />
      }
    </>
  );
}

export default App;
