import React from 'react';
import { Button, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <div className='blog_container hero_section'>
        <div className=''>
        <Typography variant="h4" component="h4" gutterBottom>
            Welcome To The Imagery Mood!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
          Use this app to take a moment to pause, reflect, and gain clarity through your image reflections.
          </Typography>
        </div>
          
        </div>
  );
};

export default HeroSection;
