import React, { useEffect, useState } from 'react';
import './mainpage.css';
import profileImage from '../images/profile.jpg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [acceptedForms, setAcceptedForms] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQueryPlace, setSearchQueryPlace] = useState('');
  const [searchQueryName, setSearchQueryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedForms = async () => {
      try {
        const response = await fetch(`http://localhost:1432/api/acceptedForms?place=${searchQueryPlace}&name=${searchQueryName}`);
        const data = await response.json();
        setAcceptedForms(data);

        // Fetch comments for each accepted form
        for (const form of data) {
          await fetchComments(form._id);
        }
      } catch (error) {
        console.error('Error fetching accepted forms:', error);
      }
    };

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserEmail(storedEmail);
    }

    fetchAcceptedForms();
  }, [searchQueryPlace, searchQueryName]);

  const fetchUserEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:1432/signin/${email}`);
      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const fetchComments = async (formId) => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms/${formId}/comments`);
      const data = await response.json();
      setComments((prevComments) => ({ ...prevComments, [formId]: data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSellerLoginClick = () => {
    navigate('/SellerSignin');
  };

  const handleChatboxClick = () => {
    navigate('/mainpage/chatbox');
  };

  const handleBack = () => {
    navigate(+1);
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleSearchByPlace = async () => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms?place=${searchQueryPlace}`);
      const data = await response.json();
      setAcceptedForms(data);
    } catch (error) {
      console.error('Error fetching forms by place:', error);
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms?name=${searchQueryName}`);
      const data = await response.json();
      setAcceptedForms(data);
    } catch (error) {
      console.error('Error fetching forms by name:', error);
    }
  };

  const handleImageClick = (imageUrl, formId) => {
    setSelectedImage({ imageUrl, formId });
  };

  const handleCloseFullImage = () => {
    setSelectedImage(null);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };


  const handlePostComment = async (acceptedFormId) => {
    if (newComment.trim() === '') return;
  
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms/${acceptedFormId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, comment: newComment }),  // Include email here
      });
  
      if (response.ok) {
        const updatedComments = await response.json();
        setComments((prevComments) => ({ ...prevComments, [acceptedFormId]: updatedComments }));
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  
  return (
    <div className="mainpage-container">
      <div className="mainpage-header">
        <button className="mainpage-header-btn" onClick={handlePrevious}>Previous</button>
        <input 
          type="text" 
          value={searchQueryPlace} 
          onChange={(e) => setSearchQueryPlace(e.target.value)} 
          placeholder="Enter a place" 
          className="mainpage-search-input" 
        />
        <button className="mainpage-header-btn" onClick={handleSearchByPlace}>Search by Place</button>
        <input 
          type="text" 
          value={searchQueryName} 
          onChange={(e) => setSearchQueryName(e.target.value)} 
          placeholder="Enter a name" 
          className="mainpage-search-input" 
        />
        <button className="mainpage-header-btn" onClick={handleSearchByName}>Search by Name</button>
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
              <button onClick={handleSellerLoginClick}>Seller Login</button>
            </div>
          )}
        </div>
        <button className="mainpage-header-btn" onClick={handleChatboxClick}>Chatbox</button>
        <button className="mainpage-header-btn" onClick={handleBack}>Next</button>
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
                onClick={() => handleImageClick(`http://localhost:1432/uploads/${form.image}`, form._id)} 
              />
              <div className={`mainpage-card-content ${selectedImage && selectedImage.formId === form._id ? 'active' : ''}`}>
                <h2>{form.name}</h2>
                <p>Description: {form.description}</p>
                <p>Category: {form.category}</p>
                <p>Price: {form.price}</p>
                <p>Place: {form.place}</p>
                <p>Rating: {form.rating}</p>
                <p>Accepted At: {new Date(form.acceptedAt).toLocaleString()}</p>
                {selectedImage && selectedImage.formId === form._id && (
                  <div className="mainpage-comments-section">
                    {comments[form._id] && comments[form._id].map((comment, index) => (
                      <div key={index} className="mainpage-comment">{comment.comment}</div>
                    ))}
                    <input 
                      type="text" 
                      className="mainpage-comment-input" 
                      value={newComment} 
                      onChange={handleCommentChange} 
                      placeholder="Add a comment" 
                    />
                    <button onClick={() => handlePostComment(form._id)}>Post</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="mainpage-full-image-container">
          <img src={selectedImage.imageUrl} alt="Full View" className="mainpage-full-image" />
          <div className="mainpage-full-image-details">
            {acceptedForms.map(form => (
              selectedImage.formId === form._id && (
                <React.Fragment key={form._id}>
                  <h2>{form.name}</h2>
                  <p>Description: {form.description}</p>
                  <p>Category: {form.category}</p>
                  <p>Price: {form.price}</p>
                  <p>Place: {form.place}</p>
                  <p>Rating: {form.rating}</p>
                  <p>Accepted At: {new Date(form.acceptedAt).toLocaleString()}</p>
                  <input 
                    type="text" 
                    className="mainpage-comment-input" 
                    value={newComment} 
                    onChange={handleCommentChange} 
                    placeholder="Add a comment" 
                  />
                  <button onClick={() => handlePostComment(form._id)}>Post</button>
                  {comments[form._id] && comments[form._id].map((comment, index) => (
                  // <div key={index} className="mainpage-comment">
                  // <p>{comment.email}: <h6 >{new Date(comment.createdAt).toLocaleString()}</h6></p> <p>{comment.comment}</p>
                  // </div>
                  <div key={index} className="mainpage-comment">
  <p className="mainpage-comment-meta">
    <span className="mainpage-comment-email">{comment.email}</span>
    <span className="mainpage-comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
  </p>
  <p className="mainpage-comment-text">{comment.comment}</p>
</div>
                   ))} 
  

                </React.Fragment>
              )
            ))}
          </div>
          <button className="mainpage-close-full-image" onClick={handleCloseFullImage}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Main;
