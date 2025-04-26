import React from 'react';
import { Container, Typography, Grid, Box, Button, Avatar } from '@mui/material';



const About = () => {
    const teamMembers = [
        {
          name: "Your Name",
          role: "Founder & CEO",
          description: "With a passion for fashion technology.",
          avatar: "https://via.placeholder.com/100", // Replace with actual image URLs
        },
        {
          name: "Team Member Name",
          role: "Lead Developer",
          description: "Ensuring smooth user experiences.",
          avatar: "https://via.placeholder.com/100",
        },
        {
          name: "Team Member Name",
          role: "Pattern Expert",
          description: "Bringing years of design expertise.",
          avatar: "https://via.placeholder.com/100",
        },
      ];
      
      const testimonials = [
        {
          quote:
            "This app has completely changed the way I design garments! The patterns are so accurate and easy to use.",
          name: "Emily T., Fashion Designer",
        },
        {
          quote:
            "As a beginner, I was intimidated by pattern-making, but this tool made it effortless. Highly recommend!",
          name: "John P., DIY Enthusiast",
        },
      ];
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Mission Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" gutterBottom>
        Our Mission
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph paddingLeft={'10%'} paddingRight={'10%'} >
        At Garment Pattern Maker, our mission is to simplify the art of garment design by empowering creators with advanced tools for pattern generation. Whether you're a professional designer or a passionate DIY enthusiast, we make it easier than ever to bring your ideas to life.
        </Typography>
        <Typography variant="h5" gutterBottom>
        Who We Are
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph paddingLeft={'10%'} paddingRight={'10%'} >
        We’re a team of tech enthusiasts, fashion experts, and innovators who believe in combining technology with creativity. Born out of a need for precision and convenience in pattern-making, our app was created to help people seamlessly transform garment photos into accurate, ready-to-use sewing patterns.
        </Typography>
      </Box>



      {/* How It Works Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom align='center'>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">1. Upload a Photo</Typography>
            <Typography variant="body2" color="textSecondary">
              Snap or upload a photo of your garment.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">2. Select Preferences</Typography>
            <Typography variant="body2" color="textSecondary">
              Choose your size, material type, and style options.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">3. Input Measurements</Typography>
            <Typography variant="body2" color="textSecondary">
              Enter your custom measurements for a perfect fit.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">4. Download Your Pattern</Typography>
            <Typography variant="body2" color="textSecondary">
              Get professional-quality patterns instantly.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          Meet the Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box textAlign="center">
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                />
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {member.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 3,
                  height: "100%",
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1" paragraph>
                  "{testimonial.quote}"
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  — {testimonial.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h4" gutterBottom>
          Join Us on This Creative Journey
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          href="#"
        >
          Get Started Now
        </Button>
      </Box>
    </Container>
  );
};

export default About;
