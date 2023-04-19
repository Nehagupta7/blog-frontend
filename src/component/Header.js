import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 0 }}>
            Company name
          </Typography>
          <nav style={{ flexGrow: 1 }}>
            <Link
              variant="button"
              color="text.primary"
              href="/blogs"
              sx={{ my: 1, mx: 1.5 }}
            >
              All Blogs
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/my-blogs"
              sx={{ my: 1, mx: 1.5 }}
            >
              My Blogs
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/addblog"
              sx={{ my: 1, mx: 1.5 }}
            >
              Add Blog
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
   
     
     
    </React.Fragment>
  );
}

export default function Header() {
  return <PricingContent />;
}