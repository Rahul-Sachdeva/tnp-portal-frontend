import React, { useState, useEffect } from 'react';
import '../../styles/Home.css'; // Import CSS for Home styling
import FullPost from '../../components/FullPost.js';

const ThirdComponent = ({ selectedPost }) => {
  const [post, setPost] = useState(selectedPost);

  useEffect(() => {
    // Fetch latest post by default
      setPost(selectedPost);
  }, [selectedPost]);

  return (
    <div className="third-component">
      {post ? (
        <FullPost key={post.id} post={post}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ThirdComponent;
