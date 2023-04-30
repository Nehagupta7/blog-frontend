import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Avatar } from '@mui/material';
import { GiButterfly } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';

function PricingContent() {
  const userProfile=JSON.parse(localStorage.getItem("UserProfile"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear("userId")
    localStorage.clear("UserProfile")
    navigate("/signIn")
  };

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}F
        sx={{ paddingTop:"20px",backgroundColor:"#00246B" ,color:"#fff"}}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
        <span style={{ marginRight:"15px"}}><GiButterfly size={30}/></span>
          <Typography variant="h6" color="#fff" noWrap sx={{ flexGrow: 0 }}>
          
            N G
          </Typography>
          <nav style={{ flexGrow: 1, color:"#fff",gap:"18px" ,display:"flex",alignItems:"center",justifyContent:"center"}} >
            <Link
              variant="button"
              to="/"
              style={{ my: 1, mx: 1.5,color:"#fff",textDecoration:"none",fontWeight:"500" }}
            >
              All Blogs
            </Link>
            <Link
              variant="button"
              to="/my-blogs"
              style={{ my: 1, mx: 1.5,color:"#fff",textDecoration:"none",fontWeight:"500" }}
            >
              My Blogs
            </Link>
            <Link
              variant="button"
              to="/addblog"
              style={{ my: 1, mx: 1.5,color:"#fff",textDecoration:"none",fontWeight:"500" }}
            >
              Add Blog
            </Link>
          </nav>
         { !userProfile?.name?<Button href="/signIn" variant="outlined" sx={{ my: 1, mx: 1.5,color:"#fff",borderColor:"#fff",":hover":{color:"#fff",borderColor:"#fff"} }}>
            Login
          </Button>
          :<>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 ,bgcolor: "#fff",color:"#00246B"}}>  {userProfile?.name?.toString()?.charAt(0)}</Avatar>
          </IconButton>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        
        <MenuItem onClick={handleClose} >
          Logout
        </MenuItem>
      </Menu></>}
        </Toolbar>
      </AppBar>
   
     
     
    </React.Fragment>
  );
}

export default function Header() {
  return <PricingContent />;
}