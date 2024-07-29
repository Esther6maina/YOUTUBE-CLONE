import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import Sidebar from './Components/Sidebar/Sidebar';

const App = () => {

  const[sidebar, setSidebar] = useState(true);
  
  return (
    <div className="app">
    <Navbar setSidebar={setSidebar} sidebarOpen={sidebar} /> {/* (1) Passed sidebarOpen state */}
    <Sidebar sidebar={sidebar} />
    <div className={`main-content ${sidebar ? 'sidebar-open' : ''}`}>
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  </div>



    // <div>
    //   <Navbar setSidebar={setSidebar}/>
      
    //   <Routes>
    //     <Route path='/'element={<Home sidebar={sidebar}/>} />
    //     <Route path='/Video/:categoryId/:VideoId'element={<Video/>} />
    //   </Routes>
    // </div>
  )
}

export default App