import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog.js";
import {ALL_BLOG} from "../api/api.js"
import HeroSection from "./HeroSection.js";
const AllBlogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(ALL_BLOG)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blog));
  }, []);
  console.log(blogs,"blof");
  return (
    <div>
      <div>

      </div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
          id={blog?._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          imageURL={blog?.image}
          userName={blog?.user?.name}
          />
        ))}
        {!blogs && <div className="main_page">
             <HeroSection/>
        </div>}
    </div>
  );
};

export default AllBlogs;
