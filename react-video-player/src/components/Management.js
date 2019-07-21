import React from 'react';
import videoService from '../services/videoService';
import emitter from "../services/playerService";

class Management extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: [],
      id: '',
      title: '',
      url: '',
      isCurrentRowEditable: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const newVideo = {
      id: Number(this.state.id),
      title: this.state.title,
      url: this.state.url,
      like: 0,
      unlike: 0
    }
    videoService.createVideo(newVideo)
      .then(response => {
        this.resetInput();
        this.refreshVideos();
      });
    event.preventDefault();
  }

  resetInput = () => {
    this.setState({
      id: '',
      title: '',
      url: ''
    });
  }

  componentWillMount() {
    this.refreshVideos();
  }

  refreshVideos() {
    videoService.getVideos()
    .then(response => response.json())
    .then(videos => {
      this.setState({
        videos: videos
      })
      // Notify the PlayList to update the video list.
      emitter.emit('onRefreshVideos', videos);
    })
  }

  onEditRow(video){
    this.setState({
      isCurrentRowEditable: true,
      currentRowId: video.id,
    });
  }

  onDeleteVideo(video) {
    if (window.confirm(`Are you sure to remove the video ${video.title}?`)) {
      videoService.deleteVideo(video.id)
        .then(response => this.refreshVideos());
    }
  }

  onApprove(video) {
    const title = this.state.rowTitle || video.title; 
    const url = this.state.rowUrl || video.url;

    const currentRowId = Number(this.state.currentRowId);
    let toBeUpdatedVideo = this.state.videos.filter(v => v.id === currentRowId)[0];

    toBeUpdatedVideo.title = title;
    toBeUpdatedVideo.url = url;
    console.log(toBeUpdatedVideo);
    videoService.updateVideo(toBeUpdatedVideo.id, toBeUpdatedVideo)
      .then(response => {
        this.refreshVideos()
        this.setState({
          isCurrentRowEditable: false
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Add new video</h2>
        <div className="row">
          <div className="col-lg-6 mt-2 mb-5">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>ID:</label>
                <input type="text" className="form-control" 
                  value={this.state.id} name="id" onChange={this.handleChange} placeholder="Enter ID" />
              </div>  
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" 
                  value={this.state.title} name="title" onChange={this.handleChange} placeholder="Enter Title" />
              </div>
              <div className="form-group">
                <label>Youtube URL:</label>
                <input type="url" className="form-control" 
                  value={this.state.url} name="url" onChange={this.handleChange} autoComplete="off" placeholder="Enter URL" />
              </div>
              <button type="submit" className="btn btn-primary">Add Video</button>
            </form>
          </div>
        </div>        
        <div className="row">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Title</th>
                <th scope="col">Url</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.videos.map(
                  video => 
                  <tr key={video.id}>
                    <th scope="row">
                      <label>{video.id}</label>
                    </th>
                    <td>
                      {
                        this.state.isCurrentRowEditable && video.id === this.state.currentRowId 
                        ? 
                        <input className="form-control" type="text" name="rowTitle"
                          onChange={this.handleChange} 
                          value={this.state.rowTitle ? this.state.rowTitle : video.title} />
                        :
                        <label>{video.title}</label>
                      }
                    </td>
                    <td>
                    {
                        this.state.isCurrentRowEditable && video.id === this.state.currentRowId 
                        ? 
                        <input className="form-control" type="text" name="rowUrl"
                          onChange={this.handleChange} 
                          value={this.state.rowUrl ? this.state.rowUrl : video.url} />
                        :
                        <label>{video.url}</label>
                      }
                    </td>
                    <td>
                      <div className="actions-container">
                        <div className="action">
                          <button className="btn btn-light" type="button" onClick={(e) => this.onEditRow(video)}>
                            Edit</button>
                        </div>
                        <div className="action">
                          <button className="btn btn-danger" type="button" onClick={() => this.onDeleteVideo(video)}>
                            Delete</button>
                        </div>
                        <div className="action">
                          <button className="btn btn-primary" 
                            disabled={!(this.state.isCurrentRowEditable && video.id === this.state.currentRowId) } 
                            type="button" onClick={(e) => this.onApprove(video)}>
                            Approve</button>
                        </div>  
                      </div>  
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>            
        </div>  
      </div>      
    );
  }
}

export default Management;