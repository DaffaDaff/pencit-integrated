import React, { useState, useEffect } from 'react';
import './userprofile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    profilePicture: '',
    name: '',
    storyCount: 0,
    followers: 0,
    following: 0,
  });
  const [userPosts, setUserPosts] = useState([]); // State untuk menyimpan cerita user
  const [activeTab, setActiveTab] = useState('cerita');

  // Fetch user data
  useEffect(() => {
    fetch('/api/user-profile')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // Fetch user posts
  useEffect(() => {
    fetch('/userpost')
      .then(response => response.json())
      .then(data => setUserPosts(data))
      .catch(error => console.error('Error fetching user posts:', error));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="userprofile">
      <div className="padding-profile">
        <div className="profile-header">
          <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p className="count">
              {userData.storyCount} cerita &nbsp;&nbsp; {userData.followers} pengikut &nbsp;&nbsp; {userData.following} mengikuti
            </p>
            <p className="tagline">Bayangan itu tak akan pernah hilang</p>
          </div>
        </div>
        <nav className="profile-nav">
          <ul>
            <li onClick={() => handleTabClick('cerita')} className={activeTab === 'cerita' ? 'active' : ''}>
              Cerita
            </li>
            <li onClick={() => handleTabClick('disukai')} className={activeTab === 'disukai' ? 'active' : ''}>
              Disukai
            </li>
            <li onClick={() => handleTabClick('tersimpan')} className={activeTab === 'tersimpan' ? 'active' : ''}>
              Tersimpan
            </li>
          </ul>
        </nav>
        <div className="profile-content">
          {activeTab === 'cerita' && (
            <div className="posts">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                  <div key={index} className="post">
                    <img src={post.imageUrl} alt={`Post ${index + 1}`} className="post-image" />
                  </div>
                ))
              ) : (
                <p>No stories to display</p>
              )}
            </div>
          )}
          {activeTab === 'disukai' && <p>Disukai</p>}
          {activeTab === 'tersimpan' && <p>Bookmark</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
