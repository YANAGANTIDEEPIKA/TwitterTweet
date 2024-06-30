
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerSignin = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1432/sellersignin', { email, password });
      if (response.status === 200) {
        localStorage.setItem('sellerEmail', email); // Store seller email
        localStorage.setItem('sellerAuthenticated', 'true');
        setAuthenticated(true);
        navigate('/sellersignin/sellerpage');
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <div>
      <h2>Seller Signin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Username:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signin</button>
      </form>
      <p>Don't have an account? <a href="/SellerSignup">Signup</a></p>
    </div>
  );
};

export default SellerSignin;
