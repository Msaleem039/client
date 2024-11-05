import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Editspecialbp = () => {
  const { id } = useParams(); // Get post ID from route params
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState({
    postTitle: '',
    postCategory: '',
    postThumbnailImage: '',
    shortDescription: '',
    postDescription: '',
    metaTitle: '',
    metaDescription: '',
    isPublish: false,
    featured: false,
    customCanonicalUrl: ''
  });

  // Fetch blog post data for editing
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/specialcatblog/${id}`);
        setPostData(response.data); // Populate form with existing post data
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    
    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPostData({
      ...postData,
      [name]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/specialcatblog/${id}`, postData);
      navigate('/sp-c-blog-post'); // Redirect back to the list after successful edit
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full overflow-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Edit Special Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-100">Post Title</label>
          <input
            type="text"
            name="postTitle"
            value={postData.postTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Post Category</label>
          <input
            type="text"
            name="postCategory"
            value={postData.postCategory.cityCategoryName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Thumbnail Image URL</label>
          <input
            type="text"
            name="postThumbnailImage"
            value={postData.postThumbnailImage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Short Description</label>
          <textarea
            name="shortDescription"
            value={postData.shortDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Post Description</label>
          <textarea
            name="postDescription"
            value={postData.postDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="6"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={postData.metaTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Meta Description</label>
          <textarea
            name="metaDescription"
            value={postData.metaDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Canonical URL</label>
          <input
            type="text"
            name="customCanonicalUrl"
            value={postData.customCanonicalUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Publish</label>
          <input
            type="checkbox"
            name="isPublish"
            checked={postData.isPublish}
            onChange={handleCheckboxChange}
            className="text-gray-700"
          />{' '}
          <span className="text-gray-300">Yes</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Featured</label>
          <input
            type="checkbox"
            name="featured"
            checked={postData.featured}
            onChange={handleCheckboxChange}
            className="text-gray-700"
          />{' '}
          <span className="text-gray-300">Yes</span>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default Editspecialbp;
