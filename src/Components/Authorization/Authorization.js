import React from 'react';
import { Spotify } from '../../util/Spotify';
import './Authorization.css'

const Authorization = (props) => {
    
    return (
        <div className="authorizationContainer">
            <div className="authorization">  
                <h2>Login with Spotify account</h2>
                <button className="authorizationButton" onClick={Spotify.getAccessToken}>Login with Spotify</button>
            </div>
        </div>
    );
}

export default Authorization;