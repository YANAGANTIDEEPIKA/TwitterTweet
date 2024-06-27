// import React from 'react';

// const Profile = () => {
//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>Welcome to your profile!</p>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {email ? (
        <p>Welcome, {email}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
