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
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { SIGNUP_USER } from '../api/api';

export default function SignUP() {
  const navigate=useNavigate()
  const [formValue,setFormvalue]=React.useState({
    name:"",
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
    const response=await axios.post(SIGNUP_USER,formValue)
    .then((res)=>{
    console.log(res,"response")
    return res?.data
    }).catch((err)=>{
        console.log(err,"error")
        toast.error(err?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    })
    if(!response?.error && response?.data?._id){
      toast.success(response?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });
      navigate("/signin")
      localStorage.setItem("userId", response?.data?._id)
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingBlock: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00246B',color:"#fff" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#00246B',color:"#fff" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to="/signin" style={{fontSize: "0.875rem", color: "#1976d2",}}>  
                                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}