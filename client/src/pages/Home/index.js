import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
// Import images
import likeIcon from '../../assets/image/like.png';
import likeClickedIcon from '../../assets/image/like_clicked.png';
import commentIcon from '../../assets/image/comment.png';
import bookmarkIcon from '../../assets/image/bookmark.png';
import bookmarkClickedIcon from '../../assets/image/bookmark_clicked.png';

const Home = () => {
  const [user, setUser] = useState(null); // Store user data
  const [postsData, setPostsData] = useState([]); // Dynamic posts from API
  const [likedPosts, setLikedPosts] = useState({}); // Track liked posts
  const [bookmarkedPosts, setBookmarkedPosts] = useState({}); // Track bookmarked posts
  const [selectedPost, setSelectedPost] = useState(null); // Selected post for comments
  const [showComments, setShowComments] = useState(false); // Show comments modal
  const [newComment, setNewComment] = useState(""); // New comment text
  const [error, setError] = useState(null); // Store error messages

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login';
    }

    const fetchCaptions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Unauthorized. Please log in.');
        }
  
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-caption`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.error) {
          throw new Error(response.data.message);
        }
  
        // Map the posts to include the full image URL
        const updatedStories = response.data.stories.map((story) => ({
          ...story,
          imageId: `${process.env.REACT_APP_API_URL}/image/${story.imageId}`,
        }));
  
        setPostsData(updatedStories);
      } catch (error) {
        console.error('Error fetching captions:', error.message);
        setError(error.message || 'Failed to fetch captions.');
      }
    };
  
    fetchCaptions();
  }, []);
  

  const toggleLike = (postIndex) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postIndex]: !prev[postIndex],
    }));
  };

  const toggleBookmark = (postIndex) => {
    setBookmarkedPosts((prev) => ({
      ...prev,
      [postIndex]: !prev[postIndex],
    }));
  };

  const openComments = (post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `/add-comment/${selectedPost._id}`, 
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.error) {
        throw new Error(response.data.message);
      }

      // Update the post comments with the new comment
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, { username: 'You', text: newComment }],
      }));
      setNewComment(""); // Clear the comment input
    } catch (error) {
      setError(error.message || 'Failed to post comment.');
    }
  };

  return (
    <div className="home-container">
      {error && <div className="error-banner">{error}</div>}

      {postsData.length > 0 ? (
        postsData.map((post, index) => (
          <div key={index} className="post-card">
            <div className="post-header">
              <div className="post-user-info">
                <img
                  src={post.userProfilePic || '/default-profile-pic.png'}
                  alt={post.username}
                  className="post-profile-pic"
                />
                <div className="header-text">
                  <span className="username">{post.title}</span>
                  <span className="timestamp">{post.visitedDate}</span>
                </div>
              </div>
            </div>

            <div className="post-image">
              <img src={post.imageId} alt="Post content" />
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
                <div className="caption-username">{post.title}</div>
                <div className="caption-text">{post.story}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}

      {showComments && selectedPost && (
        <div
          className="comments-modal-overlay"
          onClick={() => setShowComments(false)}
        >
          <div
            className="comments-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
              {selectedPost.comments &&
                selectedPost.comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-text">{comment.text}</span>
                  </div>
                ))}
            </div>
            <div className="add-comment-section">
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="post-comment-btn">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
