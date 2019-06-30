window.onload = function() {
	var videoPlayer = document.getElementById('media-video');
	
  var playBtn = document.getElementById('play-button');
  var pauseBtn = document.getElementById('play-pause-button');
  var muteBtn = document.getElementById('mute-button');
  var progressBar = document.getElementById('progress-bar');

  var likeBtn = document.getElementById('like-button');
  var unlikeBtn = document.getElementById('unlike-button');
	var likeSpan = document.getElementById('video-like');
  var unlikeSpan = document.getElementById('video-unlike');
  
  var volume = document.getElementById('video-volume');
  var volUpBtn = document.getElementById('volume-up-button');
  var volDownBtn = document.getElementById('volume-down-button');
  var stopBtn = document.getElementById('stop-button');
  var volume;
  volume.innerText = '100%';

	// disable default controls
  videoPlayer.controls = false;
  
  playBtn.addEventListener('click', function() {
    videoPlayer.play();
    playBtn.disable = true;
    pauseBtn.disable = false;
  });

  pauseBtn.addEventListener('click', function() {
    videoPlayer.pause();
    playBtn.disable = false;
    pauseBtn.disable = true;
  });

  muteBtn.addEventListener('click', function() {
    if (videoPlayer.muted) {
      muteBtn.innerHTML = '<i id="mute-icon" class="fas fa-volume-down">';
      videoPlayer.muted = false;
    } else {
      muteBtn.innerHTML = '<i id="mute-icon" class="fas fa-volume-mute">';
      videoPlayer.muted = true;
    }
  });

  volUpBtn.addEventListener('click', function() {
    if (videoPlayer.volume === 1) {
      return;
    }
    videoPlayer.volume = videoPlayer.volume + 0.1;
    videoPlayer.volume = parseFloat(videoPlayer.volume).toFixed(1);
    volume.innerText = videoPlayer.volume * 100 + '%' ;
  });

  volDownBtn.addEventListener('click', function() {
    if (videoPlayer.volume === 0) {
      return;
    }
    videoPlayer.volume = videoPlayer.volume - 0.1;
    videoPlayer.volume = parseFloat(videoPlayer.volume).toFixed(1);
    console.log(videoPlayer.volume);
    volume.innerText = videoPlayer.volume * 100 + '%';
  });  

  stopBtn.addEventListener('click', function() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    playBtn.disable = true;
    pauseBtn.disable = false;
    stopBtn.disable = true;
  });

	videoPlayer.addEventListener('timeupdate', function() {
    var percentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
    progressBar.setAttribute("style", "width: "+percentage + "%;");
    progressBar.setAttribute("aria-valuenow", percentage);
	  progressBar.innerHTML = percentage + '% played';
  }, false);

  videoPlayer.addEventListener('ended', function() { 
    this.pause(); 
  }, false);

  likeBtn.addEventListener('click', function() {
    if (localStorage.getItem('like')) {
      localStorage.setItem('like', parseFloat(localStorage.getItem('like')) + 1);
      likeSpan.innerText = localStorage.getItem('like');
    } else {
      localStorage.setItem('like', 0);
    }
  });

  unlikeBtn.addEventListener('click', function() {
    if (localStorage.getItem('unlike')) {
      localStorage.setItem('unlike', parseFloat(localStorage.getItem('unlike')) + 1);
      unlikeSpan.innerText = localStorage.getItem('unlike');
    } else {
      localStorage.setItem('unlike', 0);
    }
  });

  resetLikeAndUnlike(likeSpan, 'like');
  resetLikeAndUnlike(unlikeSpan, 'unlike');

  /**
   * The following code just for demo's purpose.
   * All the data will be load automatically from JSON in real scenarios.
   */
  var video1 = document.getElementById('video1');
  var video2 = document.getElementById('video2');
  var video3 = document.getElementById('video3');

  video1.addEventListener('click', function() {
    loadVideo(this, videoPlayer);
    document.getElementById('media-player').style.height = "700px";
  });

  video2.addEventListener('click', function() {
    loadVideo(this, videoPlayer);
    document.getElementById('media-player').style.height = "700px";
  });

  video3.addEventListener('click', function() {
    loadVideo(this, videoPlayer);
    document.getElementById('media-player').style.height = "550px";
  }); 
};

function resetLikeAndUnlike(elem, key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, 0);
  }
  elem.innerText = localStorage.getItem(key);
}

function loadVideo(video, videoPlayer) {
  videoPlayer.src = video.title;
  videoPlayer.load();
  videoPlayer.play();
}
