import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UserDashboard from './pages/UserDashboard/UserDashBoard';
import Logout from './pages/Logout/Logout';



function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Navbar />
          <Routes>
            {/* Playlist card*/}
            <Route path="/user-dashboard" element={<UserDashboard />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/" element={<Main />}>
            </Route>
          </Routes>
        <Footer />
      </CookiesProvider>
    </div>
  );
};

export default App;