import React from 'react';
import emitter from "../services/playerService";
import videoService from '../services/videoService';

class Playerlist extends React.Component {
  constructor () {
    super()
    this.state = {
      videos: []
    }
    // this.onPlay = this.onPlay.bind(this)
  }
  
  componentWillMount() {
    videoService.getVideos()
    .then(response => response.json())
    .then(videos => {
      this.setState({
        videos: videos
      })
    })
  }

  onPlay(video) {
    this.setState({
      isPlaying: true
    })
    console.log(video);
    emitter.emit("switch", video);
  }

  render() {
    return (
      <div className="media-player-list">
      <h2>Play list</h2>
      <ul className="list-group list-group-flush">
        {
          this.state.videos.map(
            video => 
            <li className="list-group-item" key={video.id} onClick={() => this.onPlay(video)}>
              <i className="fas fa-video playlistItem"></i>
              {video.title}
          </li>
          )
        }
      </ul>
    </div>
    );
  }
}

export default Playerlist;