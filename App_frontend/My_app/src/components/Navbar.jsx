import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Garment Pattern Maker 
        </Typography>
        <Button color="inherit"  onClick={()=>{
            navigate("/");
          }}>Home</Button>
        <Button color="inherit" onClick={()=>{
            navigate("/pattern-maker");
          }}>Tool</Button>
        <Button color="inherit" onClick={()=>{
            navigate("/about");
          }}>About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
