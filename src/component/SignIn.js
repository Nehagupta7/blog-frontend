import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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

    console.log(formValue,"formValue")
    const response=await axios.post("http://localhost:8080/api/user/signin",formValue)
    .then((res)=>{
    console.log(res,"response")
    return res?.data
    }).catch((err)=>{
        console.log(err,"error")
    })
    if(!response?.error){
      navigate("/blogs")
      console.log("esponse?._id",response?.data?._id)
      localStorage.setItem("userId", response?.data?._id)
    }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid container justifyContent="flex-end">
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}