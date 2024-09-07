import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CreatePost from './CreatePost'; // Import the modified CreatePost component
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import the ConfirmationDialog component
import '../styles/Post.css'; // Import CSS for Post styling
import ReactMarkdown from 'react-markdown'; // Import react-markdown for rendering markdown content

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user'); // assuming the user is stored under the 'user' key
    return user ? JSON.parse(user) : null;     // return parsed user object if exists
  };
  
  // Function to get the user role
  const getUserRole = () => {
    const user = getUserFromLocalStorage();
    return user ? user.role : null; // return the role if the user exists
  };
  
  // Usage example (check user role):
  const role = getUserRole();
  const loginUser = localStorage.getItem('user');

   // If the user is not an Admin, return null (no access)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = async (data) => {
    try {
      await api.put(`/posts/${id}`, data);
      setIsEditing(false);
      setPost((prevPost) => ({ ...prevPost, ...data }));
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
      {isEditing ? (
        <CreatePost
          initialValues={post}
          onSuccess={() => {
            setIsEditing(false);
            // You might want to refresh the post or navigate to the post page
          }}
        />
      ) : (
        <>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          {role==="Admin" && <div className="post-actions">
            <button onClick={() => setIsEditing(true)} className="post-button">
              Edit Post
            </button>
            <button onClick={() => setShowConfirmDialog(true)} className="post-button delete-button">
              Delete Post
            </button>
          </div>}
        </>
      )}

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this post?"
          onConfirm={() => {
            handleDelete();
            setShowConfirmDialog(false);
          }}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
};

export default Post;
