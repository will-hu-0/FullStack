import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Video } from '../models/video.model';
import { Constants } from '../models/constant.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(Constants.VIDEO_URL)
      .pipe(
        tap(_ => console.log('Got vidoes')),
        catchError(this.handleError<Video[]>('getHeroes', []))
      );
  }

  public addVideo(video: Video): Observable<any> {
    return this.http.post(Constants.VIDEO_URL, video, httpOptions)
      .pipe(
        tap((newVideo: Video) => console.log(`Added video w/ id=${newVideo.id}`)),
        catchError(this.handleError<any>('updateVideo'))
      );
  }

  public updateVideo(video: Video): Observable<any> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${Constants.VIDEO_URL}/${id}`;
    return this.http.put(url, video, httpOptions)
      .pipe(
        tap(_ => console.log(`Updated video id=${video.id}`)),
        catchError(this.handleError<any>('updateVideo'))
      );
  }

  public deleteVideo(video: Video | number): Observable<Video> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${Constants.VIDEO_URL}/${id}`;
    return this.http.delete<Video>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted video id=${id}`)),
        catchError(this.handleError<Video>('deleteVideo'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
