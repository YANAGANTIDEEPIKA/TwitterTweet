
// import React, { useState } from 'react';
// import axios from 'axios';

// const Postimg = () => {
//   const [name, setName] = useState('');
//   const [image, setImage] = useState(null);
//   const email = localStorage.getItem('sellerEmail'); // Retrieve email from local storage

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('image', image);
//     formData.append('email', email); // Add email to form data

//     try {
//       const response = await axios.post('http://localhost:1432/api/forms', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Image:</label>
//           <input type="file" onChange={handleImageChange} />
//         </div>
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default Postimg;
import React, { useState } from 'react';
import axios from 'axios';

const Postimg = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const email = localStorage.getItem('sellerEmail'); // Retrieve email from local storage

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('place', place);
    formData.append('rating', rating);
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
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={handleCategoryChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={handlePlaceChange} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={handleRatingChange} />
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
