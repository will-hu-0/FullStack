import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public videos: Video[];
  constructor(
    private videoService: VideoService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.loadVideos();
  }

  private loadVideos() {
    this.videoService.getVideos().subscribe(
      videos => this.videos = videos
    );
  }

  onPlay(video: Video) {
    this.videoService.getVideo(video.id).subscribe(
      respVideo => this.playerService.switchVideoEvent.emit(respVideo)
    );
  }

}
