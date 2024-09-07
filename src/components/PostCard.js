
import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown for rendering markdown content
import '../styles/PostCard.css'; // Import CSS for PostCard styling

const PostCard = ({ post, onPostClick }) => {
    const handleCardClick = () => {
        onPostClick(post);
    };

    const handleReadMoreClick = (e) => {
        e.stopPropagation(); // Prevents triggering handleCardClick
        window.open(`/posts/${post.id}`, '_blank');
    };

    return (
        <div className="post-card" onClick={handleCardClick}>
            <h2>{post.title}</h2>
            <br/>
            <div className="post-content-preview">
                <ReactMarkdown>{post.content}</ReactMarkdown> {/* Convert and render markdown content */}
            </div>
            <button className="read-more-btn" onClick={handleReadMoreClick}>Read More</button>
        </div>
    );
};

export default PostCard;
