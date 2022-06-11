import './App.css';
import Footer from './components/Footer/Footer';
import React from 'react';

import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;