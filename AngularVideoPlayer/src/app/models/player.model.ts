
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
  isMuted = false;
  isPlaying = false;

  volumeDisplay = '100%';

  muted = false;
  volume = 1;
  currentTime = 0;
  duration = 0;

  play(): void {}
  pause(): void {}
  timeupdate(): void {}
}
