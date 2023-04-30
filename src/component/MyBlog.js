import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import {MY_BLOG } from "../api/api"
import {GoSmiley} from "react-icons/go"
import { Button } from "@mui/material";
const MyBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`${MY_BLOG}${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
     
      {
        user?.blog &&
        user?.blog?.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}

        {(user?.blog?.length == 0 ||user?.blog===undefined) &&
         <div className="error__content">
           <h2><GoSmiley/></h2>
           <h3>Sorry No Blog Found!</h3>
           <p>Add New Blog Or Else See Others Blogs </p>
         </div>
        }
    </div>
  );
};

export default MyBlogs;
