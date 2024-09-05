import React from 'react'
import { Outlet } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { set_authentication } from '../../redux/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedAxios } from '../../utils/axiosConfig';

function AdminHome() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const refreshToken = localStorage.getItem('refresh');
    
  const logout = () => {
    authenticatedAxios.post('/logout/',{'refresh':refreshToken})
      .then(response => {
        dispatch(set_authentication({
          name: null,
          isAuthenticated: false,
          userid: null,
          isAdmin: false,
          isActive: false,
        }));
        localStorage.clear()
        navigate('/admin/login')
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
      <span className='font-bold text-white  text-4xl md:text-5xl lg:text-6xl flex justify-end'>
        <span  onClick={logout} className='mt-5 mr-5 cursor-pointer'>
         <CiLogout/>
        </span>
        </span>
      <div className="flex flex-col gap-4 items-center w-full h-full px-3 md:px-0">
        <h1 className="mt-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Admin Portal 
          
        </h1>
        <p className="text-gray-300">
          Application update and Status
        </p>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminHome