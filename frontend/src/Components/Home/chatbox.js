// import React from 'react';

// const Chatbox = () => {
//   return (
//     <div>
//       <h1>chatboxPage</h1>
//       <p>Welcome to your chatbox!</p>
//     </div>
//   );
// };

// export default Chatbox;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './chatbox.css';
const Chatbox = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [relatedImages, setRelatedImages] = useState([]);
  const navigate = useNavigate();

  const handleQuestionSubmit = () => {
    if (!question.trim()) return;

    axios.post(`http://localhost:1432/ask`, {
      question
    })
      .then((res) => {
        const { answer, relatedImages } = res.data;
        setChatHistory([{ question, answer }]);
        setRelatedImages(relatedImages || []);
        setQuestion("");
      })
      .catch((err) => {
        console.error("Error asking question:", err);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="chatbox-page">
      <h1>Chat Box</h1>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index}>
            <p><strong></strong> {message.question}</p>
            <p><strong></strong> {message.answer}</p>
          </div>
        ))}
      </div>
      <div className="image-container">
        {relatedImages && relatedImages.length > 0 ? (
          relatedImages.map((item, index) => (
            <div key={index} className="image-card">
              <img
                src={`http://localhost:1432/uploads/${item.image}`}  // Ensure correct URL
                alt={item.name}
                className="image"
              />
              <div className="image-details">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Place:</strong> {item.place}</p>
                <p><strong>Rating:</strong> {item.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleQuestionSubmit}>Ask</button>
      </div><br></br>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default Chatbox;
