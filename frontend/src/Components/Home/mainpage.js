
import React, { useEffect, useState } from 'react';
import './mainpage.css'; // Make sure to create this CSS file
import profileImage from '../images/profile.jpg'; // Importing the image
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [acceptedForms, setAcceptedForms] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedForms = async () => {
      try {
        const response = await fetch('http://localhost:1432/api/acceptedForms');
        const data = await response.json();
        setAcceptedForms(data);
      } catch (error) {
        console.error('Error fetching accepted forms:', error);
      }
    };

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserEmail(storedEmail); // Fetch user email if stored
    }

    fetchAcceptedForms();
  }, []);

  const fetchUserEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:1432/signin/${email}`);
      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSellerLoginClick = () => {
    navigate('/SellerSignin'); // Navigate to the seller signin page
  };

  return (
    <div className="mainpage-container">
      <div className="mainpage-header">
        <button className="mainpage-header-btn">Search by Place</button>
        <button className="mainpage-header-btn">Search by Item Name</button>
        <div className="mainpage-profile-container">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="mainpage-profile-picture" 
            onClick={handleProfileClick} 
          />
          {showProfileOptions && (
            <div className="mainpage-profile-options">
              <p>Email: {email}</p>
              <button onClick={handleSellerLoginClick}>Seller Login</button> {/* Seller Login button */}
            </div>
          )}
        </div>
        <button className="mainpage-header-btn">Chatbox</button>
      </div>
      <div className="mainpage-body-container">
        <div className="mainpage-sidebar">
          <button className="mainpage-sidebar-btn">All</button>
          <button className="mainpage-sidebar-btn">Clothes</button>
          <button className="mainpage-sidebar-btn">Food</button>
          <button className="mainpage-sidebar-btn">Footwear</button>
          <button className="mainpage-sidebar-btn">Accessories</button>
          <button className="mainpage-sidebar-btn">Blankets</button>
          <button className="mainpage-sidebar-btn">Electronic Gadgets</button>
          <button className="mainpage-sidebar-btn">Toys</button>
          <button className="mainpage-sidebar-btn">Industrial Products</button>
        </div>
        <div className="mainpage-content">
          {acceptedForms.map(form => (
            <div className="mainpage-card" key={form._id}>
              <img 
                src={`http://localhost:1432/uploads/${form.image}`} 
                alt={form.name} 
                className="mainpage-card-image" 
              />
              <div className="mainpage-card-content">
                <h2>{form.name}</h2>
                <p>Accepted At: {new Date(form.acceptedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
