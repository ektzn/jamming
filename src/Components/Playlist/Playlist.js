import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

const Playlist = (props) => {
    const handleNameChange = (event) => {
        props.onNameChange(event.target.value);
    }
    return(
        <div className="Playlist">
            <input defaultValue={'New Playlist'} />
            <TrackList tracks={props.playlistTracks}
                       onChange={handleNameChange}
                       onRemove={props.onRemove}
                       isRemoval={true} />
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;