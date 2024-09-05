import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isAuthUser from "../../utils/isAuthUser";
import { set_authentication } from "../../redux/authenticationSlice"; 
import SignIn from "../../Pages/User/Signin";
import SignUp from "../../Pages/User/Signup";
import Otp from "../../Pages/User/Otp";
import Home from "../../Pages/User/Home";
import UserPrivateRoute from "../../routes/UserPrivateRoute";
import Navbar from "../../Pages/User/Navbar";
import TicketDetails from "../../Pages/User/Subpages/TicketDetails";

function UserWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_authentication({
        userid: isAuthenticated.userid,
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
      })
    );
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuth();
    }
  }, []);

  return (
  <>
    
    <Routes>
      <Route path='/' element={<UserPrivateRoute><Home /></UserPrivateRoute>} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/otp' element={<Otp/>} />
      <Route path='/ticket/:id/' element={<TicketDetails/>} />

    </Routes>
  </>
    
  );
}

export default UserWrapper;
