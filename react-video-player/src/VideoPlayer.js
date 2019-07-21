import React from 'react';
import './VideoPlayer.css';
import Player from './components/Player';
import Controller from './components/Controller';
import Playerlist from './components/Playlist';
import Management from './components/Management';

class VideoPlayer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <h2>React video player</h2>
              <Player />
              <Controller />
            </div>
            <div className="col-lg-3">
              <Playerlist />
            </div>
          </div>
          <Management />
        </div>
      </div>
    );
  }
}

export default VideoPlayer;