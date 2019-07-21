import React from 'react';
import emitter from "../services/playerService";
import 'whatwg-fetch';
import videoService from '../services/videoService';

class Controller extends React.Component {
  progressBarRef = React.createRef();
  constructor () {
    super()
    this.state = {
      isPlaying: true,
      isMuted: true,
      volume: 1,
      volumeDisplay: '100%',
      currentVideo: {}
    }
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onVolumeUp = this.onVolumeUp.bind(this)
    this.onVolumeDown = this.onVolumeDown.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onMute = this.onMute.bind(this)
    this.onUnMute = this.onUnMute.bind(this)
    this.onLike = this.onLike.bind(this)
    this.onUnlike = this.onUnlike.bind(this)

    this.loadDefaultVideo();
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener("switch", (video) => {
      videoService.getVideo(video.id)
      .then(response => response.json())
      .then(video => {
        this.setState({
          currentVideo: video
        });
      })
    }).addListener("timeupdate", (percentage) => {
      this.progressBarRef.current.setAttribute('style', 'width: ' + percentage + '%;');
      this.progressBarRef.current.setAttribute('aria-valuenow', percentage);
      this.progressBarRef.current.innerHTML = percentage + '% played';
    });
  }

  loadDefaultVideo() {
    videoService.getVideo(1)
    .then(response => response.json())
    .then(video => {
      this.setState({
        currentVideo: video
      });
    })
  }

  onPlay() {
    this.setState({
      isPlaying: true
    })
    emitter.emit("onPlay");
  }

  onPause() {
    this.setState({
      isPlaying: false
    })
    emitter.emit("onPause");
  }

  onVolumeUp() {
    this.changeVolume(true);
    emitter.emit("onVolumeUp", this.state);
  }

  onVolumeDown() {
    this.changeVolume(false);
    emitter.emit("onVolumeDown", this.state);
  }

  onStop() {
    this.setState({
      isPlaying: false
    })
    emitter.emit("onStop");
  }

  onMute() {
    this.setState({
      isMuted: true
    })    
    emitter.emit("onMute");
  }

  onUnMute() {
    this.setState({
      isMuted: false
    })    
    emitter.emit("onUnMute");
  }

  changeVolume(up) {
    // Do not increase the volume if already 1.
    // Do not decrease the volume if already 0.
    if (
      ( up && this.state.volume === 1)
      ||
      (!up && this.state.volume === 0)
    ) {
      return;
    }

    const plusMinus = up ? 1 : -1;
    const delta = 0.1 * plusMinus;
    const currentVolume = this.state.volume;
    this.setState({
      volume: parseFloat((currentVolume + delta).toFixed(1)),
      volumeDisplay: (currentVolume + delta).toFixed(1) * 100 + '%'
    })
  }

  onLike() {
    let currentVideo = this.state.currentVideo;
    currentVideo.like += 1;
    videoService.updateVideo(
      this.state.currentVideo.id, 
      currentVideo
    ).then(response => response.json())
    .then(video => {
      this.setState({
        like: currentVideo.like
      })
    })
  }

  onUnlike() {
    let currentVideo = this.state.currentVideo;
    currentVideo.unlike += 1;
    videoService.updateVideo(
      this.state.currentVideo.id, 
      currentVideo
    ).then(response => response.json())
    .then(video => {
      this.setState({
        unlike: currentVideo.unlike
      })
    })
  }

  render() {
    return (
      <div>
        <div className="controllerWrapper">
          <div className="progress">
              <div id="progress-bar" ref={this.progressBarRef} 
                className="progress-bar bg-dark" role="progressbar" aria-valuenow="0" 
                aria-valuemin="0" aria-valuemax="100" >
              </div>
          </div>
        </div>
        <div id="media-controls">
          <button disabled={this.state.isPlaying} className="btn btn-dark" onClick={this.onPlay}>
            <i className="fa fa-play"></i>
          </button>
          <button disabled={!this.state.isPlaying} className="btn btn-dark" onClick={this.onPause}>
            <i className="fa fa-pause"></i>
          </button>
          <button className="btn btn-dark" onClick={this.onVolumeUp}>
            <i className="fa fa-plus"></i>
          </button>
          <button className="btn btn-dark" onClick={this.onVolumeDown}>
            <i className="fa fa-minus"></i>
          </button>
          
          <button id="stop-button" className="btn btn-dark" onClick={this.onStop}>
            <i className="fa fa-stop"></i>
          </button>
          {
            !this.state.isMuted ? 
            <button className="btn btn-dark" onClick={this.onMute}>
              <i id="mute-icon" className="fas fa-volume-down"></i>
            </button>: null
          }
          {
            this.state.isMuted ? 
            <button className="btn btn-dark" onClick={this.onUnMute}>
              <i id="mute-icon" className="fas fa-volume-mute"></i>
            </button>: null
          }
          <button className="btn btn-dark" onClick={this.onLike}>
            <i className="far fa-thumbs-up"></i>
            <span className="likeUnlike">{ this.state.currentVideo.like }</span>
          </button>
          <button className="btn btn-dark" onClick={this.onUnlike}>
            <i className="far fa-thumbs-down"></i>
            <span className="likeUnlike">{this.state.currentVideo.unlike}</span>
          </button>          
          <button className="btn btn-dark" disabled>
            volume<span className="volumeText">{this.state.volumeDisplay}
            </span>
          </button>          
        </div>
      </div>
    );
  }

}

export default Controller;