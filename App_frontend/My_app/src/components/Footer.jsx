import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 0, py: 1, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
      <Typography variant="body2">© 2025 Garment Pattern Maker. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
