import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      {profile ? (
        <div>
          <h3>{profile.name}</h3>
          <p>Email: {profile.email}</p>
          <p>Joined: {new Date(profile.joinedDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
