import { useEffect, useState } from 'react';
import api from '../../services/api.jsi';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loginUser = localStorage.getItem('user');
  console.log("loginUser: ", loginUser)

  const fetchPosts = async () => {
    try {
      const response = await api.get(`/posts?page=${page}`);
      if (response.data.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h1>Welcome to the Training and Placement Cell of GNDEC, Ludhiana</h1>
      <div className="post-list" style={{height:'500px', fontWeight: 800}}>
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <a href={`/post/${post.id}`}>{post.title}</a>
          </div>
        ))}
      </div>
      {!hasMore && <p>No more posts to load</p>}
    </div>
  );
};

export default Home;
