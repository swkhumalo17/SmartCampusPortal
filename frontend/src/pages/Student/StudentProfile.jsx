import React, { useState, useEffect } from 'react';
import Card from '../../components/Card'; // Use shared card component for consistency

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:7592/api/students/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Student Profile</h1>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <p className="text-gray-700">{profile.fullName}</p>
          </div>

          <div>
            <label className="label">Email</label>
            <p className="text-gray-700">{profile.email}</p>
          </div>

          <div>
            <label className="label">Student Number</label>
            <p className="text-gray-700">{profile.studentNumber}</p>
          </div>

          <div>
            <label className="label">Faculty</label>
            <p className="text-gray-700">{profile.faculty}</p>
          </div>

          <div>
            <label className="label">Level of Study</label>
            <p className="text-gray-700">{profile.levelOfStudy}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfile;
