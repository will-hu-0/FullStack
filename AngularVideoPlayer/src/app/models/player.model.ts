
export enum PlayerEvent {
  PLAY,
  PAUSE,
  MUTE,
  STOP,
  VOLUME_CHANGE,
  LIKE,
  UNLIKE,
}

export class VideoPlayer {
  isMuted = true;
  isPlaying = false;

  volumeDisplay = '100%';

  muted = false;
  volume = 1;
  currentTime = 0;
  duration = 0;
  src = '';

  play(): void {}
  pause(): void {}
  timeupdate(): void {}
}
