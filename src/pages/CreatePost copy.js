import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author_id: '', // Initialize author_id
    status: 'Draft', // Default status
    google_form_link: '', // Link input
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to create the post
      await api.post('/posts', formData);
      navigate('/home'); // Navigate to home after success
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Content"
            className="border p-2 w-full"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={formData.google_form_link}
            onChange={(e) => setFormData({ ...formData, google_form_link: e.target.value })}
            placeholder="Google Form Link"
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border p-2 w-full"
            required
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={formData.author_id}
            onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
            placeholder="Author ID"
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
