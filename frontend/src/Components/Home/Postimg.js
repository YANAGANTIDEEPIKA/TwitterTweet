import React, { useState } from 'react';
import axios from 'axios';

const Postimg = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const email = localStorage.getItem('userEmail'); // Retrieve email from local storage

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('email', email); // Add email to form data

    try {
      const response = await axios.post('http://localhost:1432/api/forms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Postimg;