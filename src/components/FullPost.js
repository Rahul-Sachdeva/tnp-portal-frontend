import React from 'react';
import ReactMarkdown from 'react-markdown'; 
import '../styles/FullPost.css'; // Import CSS for FullPost styling
import { Link } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";

const FullPost = ({ post}) => {
    return (
        <div className="full-post-container">
            {/* Title Section - Sticky */}
            <div className="post-header">
                <h1>{post.title}</h1>
                <Link to={`/post/${post.id}`}><IoMdOpen/></Link>
                <div className="post-meta">
                    <span className="post-status">{post.updated_at}</span>
                    <a href={post.google_form_link} target="_blank" rel="noopener noreferrer" className="post-link">
                        Google Form
                    </a>
                </div>
            </div>

            {/* Content Section - Scrollable */}
            <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default FullPost;
