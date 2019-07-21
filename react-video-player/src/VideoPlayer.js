import React from 'react';
import logo from './logo.svg';
import './VideoPlayer.css';
import Player from './components/Player';
import Navbar from './components/Navbar';
import Controller from './components/Controller';
import Playerlist from './components/Playlist';

class VideoPlayer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
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
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;