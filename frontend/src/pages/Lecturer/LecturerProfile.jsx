import React, { useState, useEffect } from 'react';

const LecturerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch the lecturer's profile (replace with your actual API endpoint)
    fetch('http://localhost:7592/api/lecturers/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Lecturer Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-medium">Full Name</label>
          <p className="text-gray-700">{profile.fullName}</p>
        </div>
        {/* Add more fields */}
      </div>
    </div>
  );
};

export default LecturerProfile;
