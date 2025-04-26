import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate(); // Hook to navigate between routes
  return (
    <Container maxWidth='xl' sx={{ mt: 10}}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Generate Patterns from Your Garment Photos
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mt: 3 }}>
            Upload your garment photos, input your measurements, and get
            accurate sewing patterns instantly.
          </Typography>
          <Button variant="contained" color="primary" size="large"
          onClick={()=>{
            navigate('/pattern-maker');
          }}>
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Placeholder for an image */}
          <img
            src="https://www.hunarcourses.com/blog/wp-content/uploads/2020/05/Blog4_Title-Image.jpg"
            alt="Garment example"
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
