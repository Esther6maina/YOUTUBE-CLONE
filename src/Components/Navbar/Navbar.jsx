import React, { useState } from 'react';
import './Navbar.css';
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import uploadIcon from '../../assets/upload.png';
import moreIcon from '../../assets/more.png';
import notificationIcon from '../../assets/notification.png';
import profileIcon from '../../assets/jack.png';

const Navbar = ({ setSidebar, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img
          className="menu-icon"
          onClick={() => setSidebar(prev => !prev)}
          src={menuIcon}
          alt="Menu Icon"
        />
        <img className='logo' src={logo} alt="Logo" />
        <img className={`logo ${sidebarOpen ? 'hidden' : ''}`} src={logo} alt="Logo" />
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box">
          <input
            type="text"
            placeholder='Search'
            value={searchTerm}
            onChange={handleInputChange}
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            onClick={handleSearch}
            className='search-icon'
          />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img
          className="nav-icon"
          src={uploadIcon}
          alt="Upload Icon"
          onClick={() => alert('Upload functionality not implemented')}
        />
        <img
          className="nav-icon"
          src={moreIcon}
          alt="More Icon"
          onClick={() => alert('More options not implemented')}
        />
        <img
          className="nav-icon"
          src={notificationIcon}
          alt="Notification Icon"
          onClick={() => alert('Notifications functionality not implemented')}
        />
        <img
          className="nav-icon"
          src={profileIcon}
          alt="Profile Icon"
          onClick={() => alert('Profile functionality not implemented')}
        />
      </div>
    </nav>
  );
};

export default Navbar;
