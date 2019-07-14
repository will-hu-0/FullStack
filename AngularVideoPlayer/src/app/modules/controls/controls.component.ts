import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { PlayerEvent, VideoPlayer } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {

  public playerInstance: VideoPlayer;
  // Set up default Video, will be overrided by loadFirstVideo()
  public currentPlayingVideo: Video = new Video();
  private videoPercentageUpdateEventSubscribe: Subscription;
  private siwtchVideoEventSubscribe: Subscription;

  constructor(
    private el: ElementRef,
    private playerService: PlayerService,
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.loadFirstVideo();

    this.playerInstance = this.playerService.VideoPlayer;
    this.playerInstance.volumeDisplay = '100%'; // Default volume
    this.playerInstance.isMuted = true;

    this.videoPercentageUpdateEventSubscribe = this.playerService.videoPercentageUpdateEvent
    .subscribe((percentage: number) => {
      const progressBar = this.el.nativeElement.querySelector('#progress-bar');
      progressBar.setAttribute('style', 'width: ' + percentage + '%;');
      progressBar.setAttribute('aria-valuenow', percentage);
      progressBar.innerHTML = percentage + '% played';
    });

    // Subscribe the SwitchVideoEvent to set up number of `like` & `unlike`
    this.siwtchVideoEventSubscribe = this.playerService.switchVideoEvent.subscribe((video: Video) => {
      this.currentPlayingVideo = video;
    });
  }

  private loadFirstVideo() {
    this.videoService.getVideos().subscribe(
      (videos: Video[]) => {
        if (videos.length > 0) {
          this.currentPlayingVideo = videos[0];
          this.playerService.switchVideoEvent.emit(videos[0]);  // Start to play
        }
      });
  }

  ngOnDestroy() {
    this.videoPercentageUpdateEventSubscribe.unsubscribe();
    this.siwtchVideoEventSubscribe.unsubscribe();
  }

  onPlay() {
    this.playerService.controlEvents.emit(PlayerEvent.PLAY);
    this.playerInstance.isPlaying = true;
  }

  onPause() {
    this.playerService.controlEvents.emit(PlayerEvent.PAUSE);
    this.playerInstance.isPlaying = false;
  }

  onMute() {
    this.playerService.controlEvents.emit(PlayerEvent.MUTE);
    this.playerInstance.isMuted = true;
  }

  onUnMute() {
    this.playerService.controlEvents.emit(PlayerEvent.MUTE);
    this.playerInstance.isMuted = false;
  }

  onStop() {
    this.playerService.controlEvents.emit(PlayerEvent.STOP);
    this.playerInstance.isPlaying = false;
  }

  onLike() {
    this.currentPlayingVideo.like += 1;
    this.videoService.updateVideo(this.currentPlayingVideo).subscribe(
      (video) => this.currentPlayingVideo.like = video.like
    );
  }

  onUnlike() {
    this.currentPlayingVideo.unlike += 1;
    this.videoService.updateVideo(this.currentPlayingVideo).subscribe(
      (video) => this.currentPlayingVideo.unlike = video.unlike
    );
  }

  onVolumeUp() {
    this.playerService.controlEvents.emit(PlayerEvent.VOLUME_CHANGE);
    this.changeVolume(true);
  }

  onVolumeDown() {
    this.playerService.controlEvents.emit(PlayerEvent.VOLUME_CHANGE);
    this.changeVolume(false);
  }

  private changeVolume(up: boolean) {
    // Do not increase the volume if already 1.
    // Do not decrease the volume if already 0.
    if (
      ( up && this.playerService.Volume === 1)
      ||
      (!up && this.playerService.Volume === 0)
    ) {
      return;
    }

    const plusMinus = up ? 1 : -1;
    const delta = 0.1 * plusMinus;
    this.playerService.Volume += delta;
    this.playerInstance.volumeDisplay = this.playerService.VolumeDisplay;
  }
}
