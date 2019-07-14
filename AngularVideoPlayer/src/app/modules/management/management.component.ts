import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public videos: Video[];
  isEditable = {};
  public addVideoFormGroup: FormGroup;

  constructor(
    private videoService: VideoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadVideos();
    this.buildFormGroup();
  }

  // TODO Need to add validations
  private buildFormGroup() {
    this.addVideoFormGroup = this.formBuilder.group({
      id: new FormControl(),
      title: new FormControl(),
      url: new FormControl()
    });
  }

  private loadVideos() {
    this.videoService.getVideos().subscribe(
      videos => this.videos = videos
    );
  }

  delete(row, rowIndex) {
    this.videoService.deleteVideo(row.id).subscribe(
      () => this.loadVideos()
    );
  }

  // Save row
  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    this.videoService.updateVideo(row).subscribe(
      () => this.loadVideos()
    );
  }

  addNewVideo() {
    const newVideo: Video = {
      id: Number(this.getFormValue('id')),
      title: this.getFormValue('title'),
      url: this.getFormValue('url'),
      like: 0,
      unlike: 0
    };
    this.videoService.addVideo(newVideo).subscribe(
      () => this.loadVideos()
    );
  }

  private getFormValue(controlName) {
    return this.addVideoFormGroup.controls[controlName].value;
  }
}
