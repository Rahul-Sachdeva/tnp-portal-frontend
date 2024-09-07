import React from 'react';
import '../../styles/FirstComponent.css'; // Import custom CSS for styling

const Home = () => {
  // Example data for TNP heads and resources
  const tnpHeads = [
    { name: 'Prof. G S Sodhi', role: 'Training and Placement Officer', phone: '+91-98722-19178', email: 'tpo@gndec.ac.in', image: null },
    { name: 'Abhinav Prashar', ole: 'Student Coordinator', phone: '+91-98788-59702', email: 'tpo@gndec.ac.in', image: null },
  ];

  const placementResources = [
    { title: 'GeeksforGeeks', description: 'Great for coding practice and articles.', link: 'https://www.geeksforgeeks.org/' },
    { title: 'LeetCode', description: 'Practice coding problems with solutions.', link: 'https://leetcode.com/' },
    { title: 'InterviewBit', description: 'Prepare for technical interviews.', link: 'https://www.interviewbit.com/' },
  ];

  const placeholderImage = "path/to/placeholder-image.jpg"; // Replace with an actual path to the placeholder image

  return (
    <div className="home-page-container">
      {/* Contact Info Section */}
      <div className="home-page-contact-card">
        <h2>Contact Info</h2>
        <p><strong>Phone:</strong> +1234567890</p>
        <p><strong>Email:</strong> tnp@example.com</p>
      </div>

      {/* TNP Heads Section */}
      <div className="home-page-tnp-heads">
        <h2>Heads of TNP</h2>
        <div className="home-page-tnp-heads-grid">
          {tnpHeads.map((head, index) => (
            <div key={index} className="home-page-tnp-head-card">
              <img
                src={head.image ? head.image : placeholderImage}
                alt={head.name}
                className="home-page-head-image"
              />
              <h3>{head.name}</h3>
              <p><strong>{head.role}</strong></p>
              <p><strong>Phone:</strong> {head.phone}</p>
              <p><strong>Email:</strong> <a href={`mailto:${head.email}`}>{head.email}</a></p>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Resources Section */}
      <div className="home-page-placement-resources">
        <h2>Placement Resources</h2>
        <div className="home-page-resources-grid">
          {placementResources.map((resource, index) => (
            <div key={index} className="home-page-resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">Visit Site</a>
            </div>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="home-page-location-card">
        <h2>Location</h2>
        <p>TNP Office, Guru Nanak Dev Engineering College, Ludhiana</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d432425.42418571207!2d76.0209738005771!3d30.841058308693086!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828f09011b15%3A0xbf3f5b51dcc81b12!2sGuru%20Nanak%20Dev%20Engineering%20College%2C%20Gill%20Road%2C%20Gill%20Park%2C%20Ludhiana%2C%20Punjab%2C%20India!5e0!3m2!1sen!2sus!4v1725724255380!5m2!1sen!2sus"
          width="100%"
          height="200"
          allowFullScreen=""
          loading="lazy"
          title="TNP Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
