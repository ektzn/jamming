import React from 'react'
import './Track.css'

const Track = (props) => {
    const renderAction = () => {
        return (
            props.isRemoval ? 
            <button className="Track-action" onClick={removeTrack}>-</button> : 
            <button className="Track-action" onClick={addTrack}>+</button>)
    }

    const addTrack = () => {
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        props.onRemove(props.track);
    }

    return (
        <div className="Track">
        <div className="Track-information">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {renderAction()}
        </div>
    );
}

export default Track;