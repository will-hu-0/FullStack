import React from 'react';
import emitter from "../services/playerService";

class Player extends React.Component {
  videoPlayerRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
        msg: null,
    };
  }
  componentDidMount() {
    this.eventEmitter = emitter.addListener("onPlay", () => {
      this.videoPlayerRef.current.play();
    }).addListener("onPause", () => {
      this.videoPlayerRef.current.pause();
    }).addListener("onStop", () => {
      this.videoPlayerRef.current.pause();
      this.videoPlayerRef.current.currentTime = 0;
    }).addListener("onVolumeUp", (state) => {
      this.videoPlayerRef.current.volume = state.volume;
    }).addListener("onVolumeDown", (state) => {
      this.videoPlayerRef.current.volume = state.volume;
    }).addListener("onMute", () => {
      this.videoPlayerRef.current.muted = true;
    }).addListener("onUnMute", () => {
      this.videoPlayerRef.current.muted = false;
    }).addListener("switch", (video) => {
      this.videoPlayerRef.current.src = video.url;
      this.videoPlayerRef.current.play();
    })
  }

  onTimeUpdate() {
    const percentage = Math.floor((100 / this.videoPlayerRef.current.duration)
      * this.videoPlayerRef.current.currentTime);
    emitter.emit('timeupdate', percentage); 
  }

  componentWillUnmount(){
    emitter.removeListener(this.eventEmitter);
  }

  render() {
    return (
      <div className="playerWrapper">
        { this.state.msg }
        <video loop autoPlay muted className="media-video" 
          onTimeUpdate={()=>this.onTimeUpdate()} ref={this.videoPlayerRef} >
          <source src="http://vjs.zencdn.net/v/oceans.mp4" />
        </video>
      </div>
    );
  }
}

export default Player;