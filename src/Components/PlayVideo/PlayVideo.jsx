import React from 'react'
import './PlayVideo.css'
import video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'



const PlayVideo = () => {
  return (
    <div className='play-video'>
      <video src={video} controls autoPlay muted></video>
      <h3>Best Youtube Channel To Learn Web Development</h3>
      <div className='play-video-info'>
      <p>1525 views &bull; 2 days ago</p>
      <div>
        <span><img src={like} alt=""/>125</span>
        <span><img src={dislike} alt=""/>2</span>
        <span><img src={share} alt=""/>share</span>
        <span><img src={save} alt=""/>save</span>
      </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt=""/>
        <div>
          <p>Greatstack</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-description'>
        <p>Channel that makes learning easy</p>
        <p>Subscribe Greatstack to watch more tutorials on web development</p>
        <hr />
        <h4>130 comments</h4>
        <div className="comment">
          <img src={user_profile} alt=""/>
          <div>
            <h3>Jack Nicholson<span>1 day ago</span></h3>
            <p>A global computer network providing a variety of information and commuincation of interconnected networks using standardizedcommunication protocols.</p>
            <div className='comment-action'>
              <img src={like} alt=""/>
              <span>244</span>
              <img src={dislike} alt=""/>
            </div>
          </div>                          
        </div>

        <div className="comment">
          <img src={user_profile} alt=""/>
          <div>
            <h3>Sophie Love<span>1 day ago</span></h3>
            <p>A global computer network providing a variety of information and commuincation of interconnected networks using standardizedcommunication protocols.</p>
            <div className='comment-action'>
              <img src={like} alt=""/>
              <span>244</span>
              <img src={dislike} alt=""/>
            </div>
          </div>                          
        </div>
        
        <div className="comment">
          <img src={user_profile} alt=""/>
          <div>
            <h3>DevLover123<span>1 day ago</span></h3>
            <p>This channel is a game-changer for anyone looking to learn web development! The tutorials are clear, concise, and packed with valuable information.
            </p>
            <div className='comment-action'>
              <img src={like} alt=""/>
              <span>244</span>
              <img src={dislike} alt=""/>
            </div>
          </div>                          
        </div>
        
        <div className="comment">
          <img src={user_profile} alt=""/>
          <div>
            <h3>CodeMaster456<span>1 day ago</span></h3>
            <p>The step-by-step guides on React and Node.js have been incredibly helpful for my career transition into web development. 
            </p>
            <div className='comment-action'>
              <img src={like} alt=""/>
              <span>244</span>
              <img src={dislike} alt=""/>
            </div>
          </div>                          
        </div>
        

      </div>
    </div>
  )
}

export default PlayVideo