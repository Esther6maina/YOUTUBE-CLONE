import React, { useEffect, useState } from 'react';
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../Data'
import Navbar from '../Navbar/Navbar';

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
      {/* Pass the search handler to Navbar */}
      <Navbar setSidebar={() => {}} onSearch={fetchData} />

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
              <p>{/* Include views and time ago if available */}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};















      

  
 
export default Feed