import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerEvent, VideoPlayer } from 'src/app/models/player.model';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private controlEventsSubscribe: Subscription;
  private siwtchVideoEventSubscribe: Subscription;

  public videoSourceUrl = 'http://vjs.zencdn.net/v/oceans.mp4';  // Default URL

  constructor(
    private el: ElementRef,
    private playerService: PlayerService) {}

  ngOnInit() {
    // Add event for timeupdate during playing video
    this.el.nativeElement.querySelector('.media-video').addEventListener('timeupdate', () => {
      const percentage = Math.floor((100 / this.playerService.VideoPlayer.duration)
      * this.playerService.VideoPlayer.currentTime);
      this.playerService.videoPercentageUpdateEvent.emit(percentage);
    });

    // Set up the videoPlayer instance in playerService
    this.playerService.VideoPlayer = this.el.nativeElement.querySelector('.media-video');

    this.controlEventsSubscribe = this.playerService.controlEvents.subscribe((event: PlayerEvent) => {
    switch (event) {
      case PlayerEvent.PLAY:
        this.playerService.VideoPlayer.play();
        break;

      case PlayerEvent.PAUSE:
        this.playerService.VideoPlayer.pause();
        break;

      case PlayerEvent.STOP:
        this.handleStopEvent();
        break;

      case PlayerEvent.MUTE:
        this.handleMuteEvent();
        break;

      case PlayerEvent.VOLUME_CHANGE:
        this.handleVolumeChange();
        break;
      }
    });

    this.siwtchVideoEventSubscribe = this.playerService.switchVideoEvent.subscribe((video: Video) => {
      this.handleSwitchVideoEvent(video);
    });
  }

  ngOnDestroy() {
    this.controlEventsSubscribe.unsubscribe();
    this.siwtchVideoEventSubscribe.unsubscribe();
  }

  private handleMuteEvent() {
    this.playerService.VideoPlayer.muted = !this.playerService.VideoPlayer.muted;
  }

  private handleVolumeChange() {
    this.playerService.VideoPlayer.volume = this.playerService.Volume;
  }

  private handleStopEvent() {
    this.playerService.VideoPlayer.pause();
    this.playerService.VideoPlayer.currentTime = 0;
  }

  private handleSwitchVideoEvent(video: Video) {
    this.playerService.VideoPlayer.src = video.url;
    this.handleStopEvent();
    this.playerService.VideoPlayer.play();
    this.playerService.VideoPlayer.isPlaying = true;  // For buttons style
  }

}
