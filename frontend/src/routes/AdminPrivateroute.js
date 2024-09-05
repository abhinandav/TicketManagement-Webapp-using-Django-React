import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../utils/isAuthAdmin'

function AdminPrivateRoute({ children }) {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthAdmin();
      console.log('working 3');
      setAuthInfo({
        isAuthenticated: authInfo.isAuthenticated,
        isAdmin: authInfo.isAdmin,
        isLoading: false,
      });
    };

    fetchData();
  }, []);

  if (authInfo.isLoading) {
    return <div>Loading...</div>;
  }

  if (!authInfo.isAuthenticated || !authInfo.isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default AdminPrivateRoute;
