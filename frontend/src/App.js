import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>}/>
          <Route path="/signup" element={<h1>SignUp Page</h1>}/>
          <Route path="/" element={
          <div className="App">
            <Navbar />
            <Main />
            <Footer />
          </div>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
