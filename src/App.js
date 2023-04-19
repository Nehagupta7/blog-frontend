import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './component/Home';
// import Login from './component/SignUp';
// import UserLayout from './layout/userLayout';
import SignIn from './component/SignIn';
import SignUP from './component/SignUp';
import Header from './component/Header';
import AddBlog from './component/AddBlog';
import AllBlogs from './component/AllBlogs';
import MyBlogs from './component/MyBlog';
import EditBlog from './component/EditBlog';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route path ="/signin" element={<SignIn/>} />
      <Route path ="/signup" element={<SignUP />} />
      <Route path ="/blogs" element={<AllBlogs />} />
      <Route path ="/my-blogs" element={<MyBlogs />} />
      <Route path ="/addblog" element={<AddBlog />} />
      <Route path="/my-blogs/:id" element={<EditBlog />} />
     </Routes>
     <ToastContainer/>
    </div>
  );
}

export default App;
