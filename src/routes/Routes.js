import { Route, Routes } from 'react-router-dom';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import { AuthProvider } from '../hooks/AuthContext';
import Home from '../pages/Home/Home';
import Post from '../pages/Post';
import CreatePost from '../pages/CreatePost';

const AppRoutes = () => {
  return (
    <>
      {/* We no longer need <Router> here as it's already handled by BrowserRouter in App.js */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
