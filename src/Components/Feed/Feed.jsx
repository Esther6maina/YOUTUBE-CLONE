// import React, { useEffect, useState } from 'react';
// import './Feed.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;



// const Feed = ({ category }) => {
//   const [data, setData] = useState([]);

//   // Fetching video data

//   const fetchData = async (query) => {
//     let videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

//     if (query) {
//       videoListUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
//     }
//     try {
//       const response = await axios.get(videoListUrl);
//       setData(response.data.items);
//     } catch (error) {
//       console.error("Error fetching video data:", error);
//     }
//   };
//   if (query) {
//     // If using search API, fetch detailed video statistics for each video
//     const videoIds = videos.map(video => video.id.videoId).join(',');
//     const statsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`;
//     const statsResponse = await axios.get(statsUrl);
//     const statsData = statsResponse.data.items;

//     const enrichedVideos = videos.map(video => {
//       const stats = statsData.find(stat => stat.id === video.id.videoId);
//       return { ...video, statistics: stats ? stats.statistics : {} };
//     });

//     setData(enrichedVideos);
//   } else {
//     setData(videos);
//   }
// }
//  catch (error) {
//   console.error("Error fetching video data:", error);
//  }

//   // Function to calculate time ago
//   const getTimeAgo = (date) => {
//     const now = new Date();
//     const videoDate = new Date(date);
//     const diffInSeconds = Math.floor((now - videoDate) / 1000);

//     const units = [
//       { label: 'year', seconds: 31536000 },
//       { label: 'month', seconds: 2592000 },
//       { label: 'week', seconds: 604800 },
//       { label: 'day', seconds: 86400 },
//       { label: 'hour', seconds: 3600 },
//       { label: 'minute', seconds: 60 },
//       { label: 'second', seconds: 1 },
//     ];

//     for (const unit of units) {
//       const quotient = Math.floor(diffInSeconds / unit.seconds);
//       if (quotient > 0) {
//         return `${quotient} ${unit.label}${quotient > 1 ? 's' : ''} ago`;
//       }
//     }
//     return 'just now';
//   };

//   // useEffect to fetch data on component mount or when category changes
//   useEffect(() => {
//     fetchData();
//   }, [category]);

//   return (
//     <div>
//       <div className="feed">
//         {data.map((video) => {
//           const videoId = video.id.videoId || video.id; // Determine the video ID for different API responses
//           const thumbnailUrl =
//             video.snippet.thumbnails.standard?.url ||
//             video.snippet.thumbnails.high?.url ||
//             video.snippet.thumbnails.medium?.url ||
//             video.snippet.thumbnails.default?.url; // Determine the thumbnail URL for different resolutions

//           const publishedAt = video.snippet.publishedAt;
//           const viewCount = video.statistics?.viewCount;

//           return (
//             <Link to={`https://www.youtube.com/watch?v=${videoId}`} className='card' key={videoId}>
//               <img src={thumbnailUrl} alt={video.snippet.title} />
//               <h2>{video.snippet.title}</h2>
//               <h3>{video.snippet.channelTitle}</h3>
//               <p>{getTimeAgo(publishedAt)} • {viewCount ? `${viewCount} views` : 'No views data available'}</p>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Feed;
import React, { useEffect, useState } from 'react';
import './Feed.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  // Fetching video data
  const fetchData = async (query) => {
    let videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    if (query) {
      videoListUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
    }

    try {
      const response = await axios.get(videoListUrl);
      const videos = response.data.items;

      if (query) {
        // If using search API, fetch detailed video statistics for each video
        const videoIds = videos.map(video => video.id.videoId).join(',');
        const statsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`;
        const statsResponse = await axios.get(statsUrl);
        const statsData = statsResponse.data.items;

        const enrichedVideos = videos.map(video => {
          const stats = statsData.find(stat => stat.id === video.id.videoId);
          return { ...video, statistics: stats ? stats.statistics : {} };
        });

        setData(enrichedVideos);
      } else {
        setData(videos);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };
    // Function to format the view count
    const formatViewCount = (viewCount) => {
      if (viewCount >= 1000000) {
        return `${(viewCount / 1000000).toFixed(1)}M views`;
      } else if (viewCount >= 1000) {
        return `${(viewCount / 1000).toFixed(1)}K views`;
      } else {
        return `${viewCount} views`;
      }
    };

  // Function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffInSeconds = Math.floor((now - videoDate) / 1000);

    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (const unit of units) {
      const quotient = Math.floor(diffInSeconds / unit.seconds);
      if (quotient > 0) {
        return `${quotient} ${unit.label}${quotient > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  // useEffect to fetch data on component mount or when category changes
  useEffect(() => {
    fetchData();
  }, [category]);

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

          const publishedAt = video.snippet.publishedAt;
          const viewCount = video.statistics?.viewCount;

          return (
            <Link to={`https://www.youtube.com/watch?v=${videoId}`} className='card' key={videoId}>
              <img src={thumbnailUrl} alt={video.snippet.title} />
              <h2>{video.snippet.title}</h2>
              <h3>{video.snippet.channelTitle}</h3>
              <p>{getTimeAgo(publishedAt)} • {viewCount ? formatViewCount(viewCount) : 'No views data available'}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
