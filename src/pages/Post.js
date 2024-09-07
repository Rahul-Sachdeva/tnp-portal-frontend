import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Post.css'; // Import CSS for Post styling

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        setFormData({ title: response.data.title, content: response.data.content });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      await api.put(`/posts/${id}`, formData);
      setIsEditing(false);
      setPost({ ...post, ...formData });
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate('/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <div className="post-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="post-input"
            />
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="post-textarea"
            ></textarea>
            <button onClick={handleEdit} className="post-button">Save Changes</button>
          </>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      <div className="post-actions">
        <button onClick={() => setIsEditing(!isEditing)} className="post-button">
          {isEditing ? 'Cancel' : 'Edit Post'}
        </button>
        <button onClick={handleDelete} className="post-button delete-button">Delete Post</button>
      </div>
    </div>
  );
};

export default Post;
