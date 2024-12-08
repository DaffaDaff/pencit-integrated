// pages/Home/index.js
import React, { useState } from 'react';
import './home.css';
// Import images
import picture1 from '../../assets/image/picture1.png';
import picture2 from '../../assets/image/picture2.png';
import picture3 from '../../assets/image/picture3.png';

import likeIcon from '../../assets/image/like.png';
import likeClickedIcon from '../../assets/image/like_clicked.png';
import commentIcon from '../../assets/image/comment.png';
import bookmarkIcon from '../../assets/image/bookmark.png';
import bookmarkClickedIcon from '../../assets/image/bookmark_clicked.png';

const Home = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // Sample comments data
  const sampleComments = [
    { username: 'user1', text: 'Lucunya! 😍' },
    { username: 'user2', text: 'Kucing hitamnya imut banget!' },
    { username: 'user3', text: 'Beruntung sekali menemukannya!' }
  ];

  const postsData = [
    {
      username: 'Tuan Bayangan',
      profilePic: picture1,
      postImage: picture1,
      timestamp: '17 Agustus 2024 - 20.00',
      caption: 'Lihat seberapa imut kucing hitamku HAHAHA!!! Aku menemukannya di hutan ketika aku sedang menjelajah. Ia begitu kecil dan aku memberinya sosis yang aku akan makan ketika beristirahat LOL!!!',
      comments: sampleComments
    },
    {
      username: 'Tuan Bayangan2',
      profilePic: picture2,
      postImage: picture2,
      timestamp: '17 Agustus 2024 - 20.00',
      caption: 'Lihat seberapa imut kucing hitamku HAHAHA!!! Aku menemukannya di hutan ketika aku sedang menjelajah. Ia begitu kecil dan aku memberinya sosis yang aku akan makan ketika beristirahat LOL!!!',
      comments: sampleComments
    },
    {
      username: 'Tuan Bayangan3',
      profilePic: picture3,
      postImage: picture3,
      timestamp: '17 Agustus 2024 - 20.00',
      caption: 'Lihat seberapa imut kucing hitamku HAHAHA!!! Aku menemukannya di hutan ketika aku sedang menjelajah. Ia begitu kecil dan aku memberinya sosis yang aku akan makan ketika beristirahat LOL!!!',
      comments: sampleComments
    }
  ];

  const toggleLike = (postIndex) => {
    setLikedPosts(prev => ({
      ...prev,
      [postIndex]: !prev[postIndex]
    }));
  };

  const toggleBookmark = (postIndex) => {
    setBookmarkedPosts(prev => ({
      ...prev,
      [postIndex]: !prev[postIndex]
    }));
  };

  const openComments = (post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  return (
    <div className="home-container">
      {postsData.map((post, index) => (
        <div key={index} className="post-card">
          {/* Previous post content remains the same */}
          <div className="post-header">
            <div className="post-user-info">
              <img 
                src={post.profilePic} 
                alt={post.username} 
                className="post-profile-pic"
              />
              <div className="header-text">
                <span className="username">{post.username}</span>
                <span className="timestamp">{post.timestamp}</span>
              </div>
            </div>
          </div>

          <div className="post-image">
            <img src={post.postImage} alt="Post content" />
          </div>

          <div className="post-actions">
            <button 
              className="action-btn"
              onClick={() => toggleLike(index)}
            >
              <img 
                src={likedPosts[index] ? likeClickedIcon : likeIcon} 
                alt="Like" 
                className="action-icon" 
              />
            </button>
            <button 
              className="action-btn"
              onClick={() => openComments(post)}
            >
              <img src={commentIcon} alt="Comment" className="action-icon" />
            </button>
            <button 
              className="action-btn"
              onClick={() => toggleBookmark(index)}
            >
              <img 
                src={bookmarkedPosts[index] ? bookmarkClickedIcon : bookmarkIcon} 
                alt="Save" 
                className="action-icon" 
              />
            </button>
          </div>

          <div className="post-content">
            <div className="caption-container">
              <div className="caption-username">
                {post.username}
              </div>
              <div className="caption-text">
                {post.caption}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Comments Modal */}
      {showComments && selectedPost && (
        <div className="comments-modal-overlay" onClick={() => setShowComments(false)}>
          <div className="comments-modal" onClick={e => e.stopPropagation()}>
            <div className="comments-modal-header">
              <h3>Comments</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setShowComments(false)}
              >
                ×
              </button>
            </div>
            <div className="comments-list">
              {selectedPost.comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-text">{comment.text}</span>
                </div>
              ))}
            </div>
            <div className="add-comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button className="post-comment-btn">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;