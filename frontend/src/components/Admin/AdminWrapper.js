import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_authentication } from "../../redux/authenticationSlice"; 
import AdminPrivateRoute from '../../routes/AdminPrivateroute';
import AdminHome from "../../Pages/Admin/AdminHome";
import UserTable from "../../Pages/Admin/Subpages/UserTable";
import UserTickets from "../../Pages/Admin/Subpages/UserTickets";
import Login from "../../Pages/Admin/Login";
import isAuthAdmin from "../../utils/isAuthAdmin";


function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }

    
  },[])



  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AdminPrivateRoute> <AdminHome /></AdminPrivateRoute>}>
        <Route path="/" element={<UserTable />} />
        <Route path="/usertickets/:id/" element={<UserTickets />} />
      </Route>
    </Routes>
  );
}

export default AdminWrapper;
