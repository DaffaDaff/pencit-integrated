import React, { useState } from "react";
import "./createpost.css";
import upload from "../../assets/image/upload.png";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Step 1: Upload the image
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append("image", selectedImage);

      const imageUploadResponse = await fetch("/image-upload", {
        method: "POST",
        body: formData,
      });

      const imageUploadData = await imageUploadResponse.json();

      if (!imageUploadResponse.ok) {
        throw new Error(imageUploadData.message || "Failed to upload image.");
      }

      const imageUrl = imageUploadData.imageUrl;

      // Step 2: Submit the caption
      const captionResponse = await fetch("/caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          story,
          visitedLocation,
          visitedDate,
          imageUrl,
        }),
      });

      const captionData = await captionResponse.json();

      if (!captionResponse.ok) {
        throw new Error(captionData.message || "Failed to create caption.");
      }

      alert("Post created successfully!");
      setSelectedImage(null);
      setPreviewUrl(null);
      setCaption("");
      setTitle("");
      setStory("");
      setVisitedLocation("");
      setVisitedDate("");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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
                  <img src={upload} alt="Upload" className="upload-icon" />
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

          <div className="form-section">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
            <input
              placeholder="Write your story..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="text"
              placeholder="Visited Location"
              value={visitedLocation}
              onChange={(e) => setVisitedLocation(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="date"
              value={visitedDate}
              onChange={(e) => setVisitedDate(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="share-button" disabled={isLoading}>
            {isLoading ? "Sharing..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
