import React, { useState } from 'react';
import FirstComponent from './FirstComponent';
import MiddleComponent from './MiddleComponent';
import ThirdComponent from './ThirdComponent';
import '../../styles/Home.css'; // Import CSS for Home styling

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="home-container">
      <div className="first-component">
        <FirstComponent />
      </div>
      
      <div className="middle-component">
        <MiddleComponent onPostClick={handlePostClick} setFirstPost={setSelectedPost}/>
      </div>

      <div className="third-component">
        <ThirdComponent selectedPost={selectedPost} />
      </div>
    </div>
  );
};

export default Home;
