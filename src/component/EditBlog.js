import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {UPDATE_BLOG,ALL_BLOG} from "../api/api"
import { toast } from "react-toastify";
const labelStyles = { mb: "5px", mt: "10px", fontSize: "16px", fontWeight: "bold" ,textAlign:"left"};


const EditBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`${ALL_BLOG}${id}`)
      .catch((err) => console.log(err));
    const data = await res?.data;
    return data;
  };
  useEffect(() => {
    fetchDetails()?.then((data) => {
      setBlog(data?.blog);
      setInputs({
        title: data?.blog?.title,
        description: data?.blog?.description,
        imageURL:data?.blog?.image
      });
      console.log(inputs)
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`${UPDATE_BLOG}${id}`, {
        title: inputs.title,
        description: inputs.description,
        image:inputs.imageURL
      }).then((resData)=>{
        toast.success("Blog Updated Successfully", {
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
      .catch((err) => console.log(err));

    const data = await res?.data;
    console.log(data,"response")
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
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/my-blogs"));
  };

  return (
    <div className="blog_container">
      {inputs && (
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
            Edit Your Blog
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
      )}
    </div>
  );
};

export default EditBlog;
