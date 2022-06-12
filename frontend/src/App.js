import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            {/* Playlist card
            User Profile */}
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/" element={<Main />}>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </CookiesProvider>
    </div>
  );
}

export default App;
