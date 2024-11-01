import { Button } from '@material-tailwind/react'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/home/Home';
import NoPage from './pages/nopage/NoPage';
import ProductInfo from './pages/productInfo/ProductInfo';
import Layout from './components/layout/Layout';
import ScrollTop from './components/scrollTop/ScrollTop';
import CartPage from './pages/cart/CartPage';
import AllProduct from './pages/allProduct/AllProduct';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProductPage from './pages/admin/AddProductPage';
import UpdateProductPage from './pages/admin/UpdateProductPage';
import MyState from './context/MyState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser';
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin';
import CategoryPage from './pages/category/CategoryPage';

const App = () => {
  return (
    <MyState>
    <Router>
      
      <ScrollTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/*' element={<NoPage/>}/>
        <Route path='/product-info/:id' element={<ProductInfo/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/allproducts' element={<AllProduct/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/category/:categoryName' element={<CategoryPage/>}/>
        <Route path="/user-dashboard" element={
          <ProtectedRouteForUser>
            <UserDashboard/>
          </ProtectedRouteForUser>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
        } />
        <Route path="/addproduct" element={<AddProductPage/>} />
        <Route path="/updateproduct/:id" element={
          <ProtectedRouteForAdmin>
            <UpdateProductPage/>
          </ProtectedRouteForAdmin>
        } />


        
      </Routes>
      <Toaster/>
    </Router>
    </MyState>
  )
}

export default App