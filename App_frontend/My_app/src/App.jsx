import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Pattern from './components/Pattern';
import About from './components/About';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"element={
            <>
              
              <Box className="content"> <Home /> </Box>
               
            </>}/>
            <Route path="/pattern-maker"element={
            <>
              
              <Box className="content2"> <Pattern /> </Box>
               
            </>}/>
            <Route path="/about"element={
            <>
              
              <Box className="content3"> <About /> </Box>
               
            </>}/>
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
