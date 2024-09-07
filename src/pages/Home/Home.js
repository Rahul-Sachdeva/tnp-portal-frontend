import React, { useState, useEffect } from 'react';
import FirstComponent from './FirstComponent';
import MiddleComponent from './MiddleComponent';
import ThirdComponent from './ThirdComponent';
import '../../styles/Home.css'; // Import CSS for Home styling

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home-container">
      {!isMobile && <div className="first-component">
        <FirstComponent />
      </div>}
      
      <div className="middle-component">
        <MiddleComponent onPostClick={handlePostClick} setFirstPost={setSelectedPost}/>
      </div>

      {!isMobile && <div className="third-component">
        <ThirdComponent selectedPost={selectedPost} />
      </div>}
    </div>
  );
};

export default Home;
