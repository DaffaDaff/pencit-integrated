import React, { useState } from 'react';
import './createpost.css';
import upload from '../../assets/image/upload.png';

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission here
    console.log('Image:', selectedImage);
    console.log('Caption:', caption);
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="upload-section">
            {!previewUrl ? (
              <div className="upload-placeholder">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-upload"
                  className="file-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <img 
                    src={upload} 
                    alt="Upload" 
                    className="upload-icon"
                  />
                  <span>Upload Image</span>
                </label>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedImage(null);
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="caption-section">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
            />
          </div>

          <button type="submit" className="share-button">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;