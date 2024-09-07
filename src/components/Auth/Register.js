import { useState, useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import './Auth.css'; // Import custom CSS for styling

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'Student',
  });

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user'); // assuming the user is stored under the 'user' key
    return user ? JSON.parse(user) : null;     // return parsed user object if exists
  };
  
  // Function to get the user role
  const getUserRole = () => {
    const user = getUserFromLocalStorage();
    return user ? user.role : null; // return the role if the user exists
  };
  
  // Usage example (check user role):
  const role = getUserRole();
  const loginUser = localStorage.getItem('user');

   // If the user is not an Admin, return null (no access)
  if (role !== 'Admin') {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert('Password and Confirmation Password Do not Match');
      return;
    }
    register(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="Core Member">Core Member</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
