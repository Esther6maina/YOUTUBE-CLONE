import React, { useEffect, useState } from 'react';
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../Data'

const feed = ({data}) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const videDate = new Date(date);
    const diffInSeconds = Math.floor((now - videDate) /1000);

    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds:60 },
      { label: 'second', seconds: 1 },
    ];

    for (const unit of units){
      const qoutient = Math.floor(diffInSeconds / unit.seconds);
      if (qoutient > 0){
        return `${qoutient} ${unit.label}${qoutient > 1 ? `s` : ''} ago`;
      }
    }
    return 'just now';
  }
};

const Feed = ({category}) => {

  const [data,setData] = useState([]);
  

  const fetchData = async (query) =>{

      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

      if (query) {
        videoList_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
      }
   
      await fetch(videoList_url)
      .then(response=>response.json())
      .then(data=> {
        if (query) {
          setData(data.items);
        }
        else {
          setData(data.items);
        }

      });
  }; 

  const handleSearch = () =>{
    fetchData(searchTerm);
  };

  useEffect(()=>{
    fetchData();
  },[category])

  console.log(data, "----28----")
  
  return (
    <div>
      <div className="feed">
        {data.map((video) => {
          const videoId = video.id.videoId || video.id; // Determine the video ID for different API responses
          const thumbnailUrl =
            video.snippet.thumbnails.standard?.url ||
            video.snippet.thumbnails.high?.url ||
            video.snippet.thumbnails.medium?.url ||
            video.snippet.thumbnails.default?.url; // Determine the thumbnail URL for different resolutions

          return (
            <Link to={`https://www.youtube.com/watch?v=${videoId}`} className='card' key={videoId}>
              <img src={thumbnailUrl} alt={video.snippet.title} />
              <h2>{video.snippet.title}</h2>
              <h3>{video.snippet.channelTitle}</h3>
              {/* <p>Include views and time ago if available</p> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
 
 
export default Feed