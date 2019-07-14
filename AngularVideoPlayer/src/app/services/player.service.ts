import { Injectable, Output, EventEmitter } from '@angular/core';
import { PlayerEvent, VideoPlayer } from '../models/player.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  /**
   * Handling control events
   */
  @Output() controlEvents: EventEmitter<PlayerEvent> = new EventEmitter();

  /**
   * Handling percentage update event during playing video.
   */
  @Output() videoPercentageUpdateEvent: EventEmitter<number> = new EventEmitter();

  /**
   * Handling switching video event
   */
  @Output() switchVideoEvent: EventEmitter<Video> = new EventEmitter();

  constructor() { }

  private videoPlayer: VideoPlayer = new VideoPlayer();

  public get VideoPlayer(): VideoPlayer {
    return this.videoPlayer;
  }

  public set VideoPlayer(value: VideoPlayer) {
    this.videoPlayer = value;
  }

  public get Volume(): number {
    return this.videoPlayer.volume;
  }

  public set Volume(value: number) {
    this.videoPlayer.volume = parseFloat(value.toFixed(1));
  }

  public get VolumeDisplay(): string {
    return this.videoPlayer.volume * 100 + '%';
  }

}
