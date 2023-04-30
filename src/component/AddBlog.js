import { Box, Button, ImageList, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ADD_BLOG} from "../api/api"
import { toast } from "react-toastify";


const labelStyles = { mb: "5px", mt: "10px", fontSize: "16px", fontWeight: "bold" ,textAlign:"left"};
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(ADD_BLOG, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const SplashImageUrl= async()=>{
   const splashImg= "https://source.unsplash.com/featured/300x203"
    const res = await axios
      .get(splashImg)
      .catch((err) => console.log(err));
    const data = await res.request.responseURL;
    console.log(data)
    setInputs({...inputs,imageURL:data})
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const userLogin=localStorage.getItem("userId")
    if(!userLogin){
      toast.warning("Please Login ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        navigate("/signin")
        return;
    }
    for(const value in inputs){
      if(inputs[value]=== ""){
        console.log(value)
      return  getError(value);
      }
    }
   
    sendRequest()
      .then((data) =>  toast.success("Blog Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }))
      .then(() => navigate("/"));
  };
  const getError=(value)=>{
    let valueLength=document.getElementsByName(value)?.length-1
const formValue=document.getElementsByName(value)[valueLength].focus()
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
  useEffect(()=>{
    
    SplashImageUrl();},[])
  return (
    <div className="blog_container">
      <form onSubmit={handleSubmit}>
        <Box
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          sx={{width:"100%",maxWidth:"400px"}}
        >
          <Typography
            padding={1}
            color="#00246b"
            variant="h5"
            textAlign={"center"}
            fontWeight={500}
          >
            Post Your Imagery Mood 
          </Typography>
          <InputLabel  sx={labelStyles}>
            Title of blog
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="outlined"
          />
          <span style={{color:"red"}}></span>
          <InputLabel  sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            variant="outlined"
            multiline
            rows={4}
          />
          <span style={{color:"red"}}></span>
          <InputLabel  sx={labelStyles}>
          Genrate Random Image for Blog
          </InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            type="hidden"
            variant="outlined"
            sx={{visibility:"hidden"}}
          />
          <div style={{display:"flex", flexDirection:"column",gap:"15px",alignItems:"center",justifyContent:"space-between"}}>
          <img src={ inputs.imageURL || "/images.png"} style={{width:"150px",height:"150px",objectFit:"cover"}}/>

          <Button
            sx={{ bgcolor:"#00246B" ,":hover":{
              background:"#00246B"
            }}}
            onClick={()=>{
              SplashImageUrl();
            }}
            variant="contained"
             type="button"
          >
           New Image
          </Button>
          </div>
          <Button
            sx={{ mt: 2, bgcolor:"#00246B" ,":hover":{
              background:"#00246B"
            }}}
            variant="contained"
             type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
