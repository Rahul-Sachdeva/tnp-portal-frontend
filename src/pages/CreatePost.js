import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import MarkdownEditor from '../components/MarkDownEditor'; // Import your Markdown Editor
import '../styles/CreatePost.css'; // Import CSS for CreatePost styling

function CreatePost({ initialValues, onSuccess }) {
    const navigate = useNavigate();
    const loginUser = localStorage.getItem('user');
    const userObject = JSON.parse(loginUser);

    

    // Initialize useForm with default values from props
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            title: initialValues?.title || '',
            content: initialValues?.content || '',
            status: initialValues?.status || 'Draft',
            google_form_link: initialValues?.google_form_link || '',
            author_id: userObject?.id || '',
        },
    });

    useEffect(() => {
        if (initialValues) {
            // Set values if initialValues are provided
            setValue('title', initialValues.title);
            setValue('content', initialValues.content);
            setValue('status', initialValues.status);
            setValue('google_form_link', initialValues.google_form_link);
        }
    }, [initialValues, setValue]);

    const submit = async (data) => {
        data.author_id = userObject?.id; // Ensure author_id is set from userObject

        try {
            let response;
            if (initialValues) {
                // If initialValues exist, it's an update
                response = await api.put(`/posts/${initialValues.id}`, data);
            } else {
                // Otherwise, it's a create
                response = await api.post('/posts', data);
            }

            if (response.status === 201 || response.status === 200) {
                // Redirect to the post detail page or call onSuccess
                if (!initialValues) {
                    navigate(`/posts/${response.data.id}`);
                } else {
                    onSuccess(); // Call onSuccess callback for updates
                }
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    if(userObject.role!=="Admin") return null;

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
            <button type="submit">
                {initialValues ? 'Update Post' : 'Create Post'}
            </button>
        </form>
    );
}

export default CreatePost;
