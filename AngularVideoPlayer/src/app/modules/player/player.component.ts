import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerEvent, VideoPlayer } from 'src/app/models/player.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private controlEventsSubscribe: Subscription;

  constructor(
    private el: ElementRef,
    private playerService: PlayerService) {}

  ngOnInit() {
    // Add event for timeupdate during playing video
    this.controlEventsSubscribe = this.el.nativeElement.querySelector('.media-video')
      .addEventListener('timeupdate', () => {
        // console.log(this.playerService.VideoPlayer.currentTime);
        const percentage = Math.floor((100 / this.playerService.VideoPlayer.duration)
         * this.playerService.VideoPlayer.currentTime);
        console.log('percentage', percentage);
        this.playerService.videoPercentageUpdateEvent.emit(percentage);
    });

    // Set up the videoPlayer instance in playerService
    this.playerService.VideoPlayer = this.el.nativeElement.querySelector('.media-video');

    this.playerService.controlEvents.subscribe((event: PlayerEvent) => {
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
  }

  ngOnDestroy() {
    this.controlEventsSubscribe.unsubscribe();
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

}
