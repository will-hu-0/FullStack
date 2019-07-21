const videoService = {
  
  getVideo(id) {
    return fetch('http://localhost:4000/videos/' + id);
  },

  getVideos() {
    return fetch('http://localhost:4000/videos');
  },

  updateVideo(id, body) {
    return fetch('http://localhost:4000/videos/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}

export default videoService