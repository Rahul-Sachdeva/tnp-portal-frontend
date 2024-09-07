import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import SearchBar from '../../components/SearchBar.js'; // Import SearchBar component
import '../../styles/Home.css'; // Import CSS for Home styling
import PostCard from '../../components/PostCard'; // Import PostCard component

const MiddleComponent = ({ onPostClick, setFirstPost }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false); // Track fetching state

    const fetchPosts = async () => {
        if (isFetching || !hasMore) return; // Prevent multiple fetches at once
        setPage(prevPage+1);
        setIsFetching(true);
        try {
            const response = await api.get(`/posts?page=${prevPage+1}`);
            if (response.data.data.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
                setFilteredPosts((prevPosts) => [...prevPosts, ...response.data.data]);
                if (page === 1) setFirstPost(response.data.data[0]);
                setPrevPage(prevPage+1);
            } else {
                setHasMore(false); // No more posts to load
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsFetching(false); // Fetching is done
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const handleScroll = () => {
        if (isFetching || !hasMore) return; // Stop if already fetching or no more posts

        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const threshold = document.documentElement.offsetHeight - 200; // 200px before the bottom

        if (scrollPosition >= threshold) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, hasMore]); // Ensure the listener reacts to fetching and hasMore state

    const handleSearch = (searchTerm) => {
        const filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        if(filtered.length<10 && hasMore){
            setPage((prevPage) => prevPage + 1);
        }
        setFilteredPosts(filtered);
    };

    return (
        <div className="middle-component">
            <SearchBar onSearch={handleSearch} />
            <div className="posts-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} onPostClick={onPostClick} />
                    ))
                ) : (
                    hasMore && <p>Loading...</p>
                )}
            </div>
            {!hasMore && <p>No more posts to load</p>}
        </div>
    );
};

export default MiddleComponent;
