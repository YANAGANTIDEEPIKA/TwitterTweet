import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sellerpage.css';  // Ensure you import the CSS file

const Seller = () => {
  const [sellerName, setSellerName] = useState('');
  const [showProfileName, setShowProfileName] = useState(false);
  const navigate = useNavigate();
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const fetchSellerName = async () => {
      const email = localStorage.getItem('sellerEmail');
      if (!email) {
        navigate('/sellersignin');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:1432/sellersignin/${email}`);
        if (response.status === 200) {
          setSellerName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching seller name:', error);
      }
    };

    fetchSellerName();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setShowProfileName(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileName(!showProfileName);
  };

  const handleAddPostClick = () => {
    navigate('/postimg');
  };

  return (
    <div className="seller-container">
      <div className="seller-header">
        <button className="seller-header-button">Welcome to seller page</button>
        <button className="seller-header-button" onClick={handleAddPostClick}>Add Your Post</button>
        <button ref={profileButtonRef} className="seller-header-button profile-button" onClick={handleProfileClick}>Profile</button>
        
      </div>
      <div className="seller-content">
        <div className="seller-box">How many images this user should post</div>
        <div className="seller-box">What images the user posted</div>
        {showProfileName && (
          <div id="profileName" className="seller-profile-name">Seller Name: {sellerName}</div>
        )}
      </div>
    </div>
  );
};

export default Seller;
