import React from 'react';
import { authenticatedAxios } from '../../utils/axiosConfig';
import { set_authentication } from '../../redux/authenticationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refresh');
  const authentication_user = useSelector(state => state.authentication_user);

  const logout = () => {
    authenticatedAxios.post('/logout/', { 'refresh': refreshToken }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      dispatch(set_authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false,
      }));
      localStorage.clear();
      navigate('/login');
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <div className="top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              YourTicket Check
            </Link>
          </div>

          {/* User Info and Buttons */}
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            {authentication_user.isAuthenticated && !authentication_user.isAdmin && !authentication_user.isTeacher ? (
              <>
                {/* User Name */}
                <span className="text-sm sm:text-base md:text-lg font-medium capitalize text-gray-700">
                  {authentication_user.name}
                </span>
                {/* Logout Button */}
                <button 
                  onClick={logout}
                  className="text-sm sm:text-base md:text-lg bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link to="/login" className="text-sm sm:text-base md:text-lg text-gray-700 hover:text-indigo-700">
                  Login
                </Link>
                {/* Sign-up Button */}
                <Link to="/signup" className="text-sm sm:text-base md:text-lg bg-indigo-100 hover:bg-indigo-200 px-3 py-2 rounded-md shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;