import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import MarkdownEditor from '../components/MarkDownEditor'; // Import your Markdown Editor
import '../styles/CreatePost.css'; // Import CSS for CreatePost styling

function CreatePost() {
    const loginUser = localStorage.getItem('user');
    const userObject = JSON.parse(loginUser);

    // Initialize useForm with default values
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            title: '',
            content: '',
            status: 'Draft',  // Set 'Draft' as default status
            google_form_link: '',
            author_id: userObject?.id, // Use optional chaining in case the user is null
        },
    });

    const navigate = useNavigate();

    const submit = async (data) => {
        data.author_id = userObject?.id; // Ensure author_id is set from userObject

        try {
            const response = await api.post('/posts', data);
            if (response.status === 201) {
                navigate(`/posts/${response.data.id}`);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="create-post-form">
            {/* Title Input */}
            <div className="input-group">
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter post title"
                />
            </div>

            {/* Markdown Editor for Content */}
            <div className="input-group">
                <label htmlFor="content">Post Content:</label>
                <MarkdownEditor
                    name="content"
                    control={control}
                />
            </div>

            {/* Google Form Link Input */}
            <div className="input-group">
                <label htmlFor="google_form_link">Google Form Link:</label>
                <input
                    id="google_form_link"
                    type="text"
                    {...register("google_form_link")}
                    placeholder="Enter Google Form link"
                />
            </div>

            {/* Status Dropdown */}
            <div className="input-group">
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    {...register("status", { required: true })}
                >
                    <option value="Draft">Draft</option>
                    <option value="Publish">Publish</option>
                    <option value="Cancel">Cancel</option>
                </select>
            </div>

            {/* Submit Button */}
            <button type="submit">Create Post</button>
        </form>
    );
}

export default CreatePost;
