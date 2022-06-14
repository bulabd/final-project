import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider, useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UserDashboard from './pages/UserDashboard/UserDashBoard';

function App() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null); 
  const [error, setError] = useState(null);
  const [cookie, setCookie] = useCookies(['user']);
  // const navigate = useNavigate();


  function handleCookie(data) {
    setCookie("userCookie", data.id, {
      path: "/"
    });
  }

  async function onLogin(email, password, callback) {
    console.log("onLogin-------------", email, password)
    try {
      const {data} = await axios.post('http://localhost:8080/login', {email, password});
      console.log("I am data!----------", data);
      setEmail(email); 
      setPassword(password); 
      console.log("Email, password", email, password);

      if(data) {
        handleCookie(data);
        callback();
        // navigate("..", { replace: true });
      }
    } catch(ex) {
      setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
    }
  }

  return (
    <div className="App">
      <CookiesProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            {/* Playlist card*/}
            <Route path="/user-dashboard" element={<UserDashboard />}/>
            <Route path="/login" element={<Login onFormSubmit={ onLogin } />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/" element={<Main />}>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </CookiesProvider>
    </div>
  );
};

export default App;