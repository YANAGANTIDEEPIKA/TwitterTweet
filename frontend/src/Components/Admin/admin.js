
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1432/api/forms');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:1432/api/forms/${id}/accept`);
      setFormData(formData.map(form => (form._id === id ? response.data : form)));
      console.log('Accepted form with ID:', id);
    } catch (error) {
      console.error('Error accepting form:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:1432/api/forms/${id}/reject`);
      setFormData(formData.map(form => (form._id === id ? response.data : form)));
      console.log('Rejected form with ID:', id);
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Image</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Seller Email</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>User Email</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form) => (
            <tr key={form._id}>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{form.name}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                <img src={`http://localhost:1432/uploads/${form.image}`} alt={form.name} style={{ width: '100%', height: 'auto', maxWidth: '200px' }} />
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{form.sellerEmail}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{form.userEmail}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                {form.status === 'pending' && (
                  <>
                    <button onClick={() => handleAccept(form._id)}>Accept</button>
                    <button onClick={() => handleReject(form._id)}>Reject</button>
                  </>
                )}
                {form.status === 'accepted' && <span>Accepted</span>}
                {form.status === 'rejected' && <span>Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
