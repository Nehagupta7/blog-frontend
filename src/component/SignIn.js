import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import {LOGIN_USER} from "../api/api"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
export default function SignIn() {
  const navigate=useNavigate()
  const [formValue,setFormvalue]=React.useState({
    email: "",
    password: "",
  });
  const handleChange =(e)=>{
   const {name,value}=e.target;
   setFormvalue({...formValue,[name]:value})
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const getError=(value)=>{
      let valueLength=document.getElementsByName(value)?.length-1
  const formValueData=document.getElementsByName(value)[valueLength].focus()
  toast.warning(`${value.charAt(0).toUpperCase()}${value.slice(1)} is required field`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    }
    for(const value in formValue){
      if(formValue[value]=== ""){
        console.log(value)
      return  getError(value);
      }
    }
    
    console.log(formValue,"formValue")
    const response=await axios.post(LOGIN_USER,formValue)
    .then((res)=>{
      console.log("re",res?.data.data)
      navigate("/")
      localStorage.setItem("userId", res?.data.data?._id)
      localStorage.setItem("UserProfile", JSON.stringify(  res?.data.data))
      toast.success("Welcome to the Blog App", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return res?.data
    }).catch((err)=>{
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        console.log(err,"error")
    })

  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00246B',color:"#fff" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:"#00246B",color:"#fff" }}

            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid container justifyContent="flex-end">
                <Link to="/signup" style={{fontSize: "0.875rem", color: "#1976d2",}}>  
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}