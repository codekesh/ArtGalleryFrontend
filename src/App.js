import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Event from "./Pages/Event/Event";
import News from "./Pages/News/News";
import About from "./Pages/About/About";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/SIgnup.js";
import "react-toastify/dist/ReactToastify.css";
import Private from "./components/Routes/Private/Private.js";
import Forgot from "./Pages/Forgot/Forgot.js";
import Productpage from "./Pages/Productpage/Productpage.js";
import AdminRoute from "./components/Routes/Private/AdminRoute.js";
import Admindashboard from "./Pages/Admin/Admindashboard/Admindashboard.js";
import CreateCategory from "./Pages/Admin/CreateCategory/CreateCategory.js";
import CreateProduct from "./Pages/Admin/CreateProduct/CreateProduct.js";
import Users from "./Pages/Admin/Users/Users.js";
import Userdashboard from "./Pages/User/Userdashboard/Userdashboard.js";
import Profile from "./Pages/User/Profile/Profile.js";
import Orders from "./Pages/User/Orders/Orders.js";
import Product from "./Pages/Admin/Product/Product.js";
import UpdateProduct from "./Pages/Admin/UpdateProduct/UpdateProduct.js";
import Search from "./Pages/Search/Search.js";
import Categories from "./Pages/Categories/Categories.js";
import CategoryProduct from "./Pages/CategoryProduct/CategoryProduct.js";
import Cart from "./Pages/Cart/Cart.js";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/User" element={<Private />}>
          <Route path="Userdashboard" element={<Userdashboard />} />
          <Route path="Userdashboard/profile" element={<Profile />} />
          <Route path="Userdashboard/orders" element={<Orders />} />
        </Route>
        <Route path="/Admin" element={<AdminRoute />}>
          <Route path="Admindashboard" element={<Admindashboard />} />
          <Route
            path="Admindashboard/create-category"
            element={<CreateCategory />}
          />
          <Route
            path="Admindashboard/create-product"
            element={<CreateProduct />}
          />
          <Route
            path="Admindashboard/product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="Admindashboard/products" element={<Product />} />
          <Route path="Admindashboard/users" element={<Users />} />
        </Route>
        <Route path="/Shop" element={<Shop />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/Forgot" element={<Forgot />}></Route>
        <Route path="/product/:slug" element={<Productpage />}></Route>
        <Route path="/categories/:slug" element={<CategoryProduct />}></Route>
        <Route path="/Event" element={<Event />}></Route>
        <Route path="/News" element={<News />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
};
export default App;
