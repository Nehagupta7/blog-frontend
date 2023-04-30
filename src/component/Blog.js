import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import {FiEdit} from "react-icons/fi"
import {AiFillDelete} from "react-icons/ai"
import axios from "axios";
import {ALL_BLOG} from "../api/api"
import { toast } from "react-toastify";
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/my-blogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${ALL_BLOG}${id}`)
      .then(() =>{ navigate("/addblog")
      toast.success("Blog Deleted Successfully", {
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
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
     
  };
  return (
    <div className="blog_container">
     
      <Card
        sx={{
          maxWidth: "500px",
          width:"100%",
          margin: " auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        
       
        {isUser && (
          <>
           <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: "#00246B" }}
          aria-label="recipe"
        >
          {userName ? userName.charAt(0) : ""}
        </Avatar>
      }
      title={(
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <FiEdit color="green" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <AiFillDelete color="red" />
          </IconButton>
        </Box>
      )}
    />
        
        </>

        )}
        <CardHeader
          avatar={
           !isUser && <Avatar
              sx={{ bgcolor: "#00246B" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            
            variant="body2"
            color="text.secondary"
          >
            <b style={{color:"#00246B"}}>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
