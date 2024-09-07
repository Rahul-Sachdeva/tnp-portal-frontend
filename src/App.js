import React from 'react';
import AppRoutes from './routes/Routes.js'; // Import the routes
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar.js';
import {AuthProvider} from './hooks/AuthContext'; // Adjust the path accordingly

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>
          <AppRoutes /> {/* This will handle all routing */}
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
