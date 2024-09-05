import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from '../utils/isAuthUser'



function UserPrivateRoute({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    is_authenticated: false,
    is_admin: false,
  });


  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,        
      });
        setLoading(false);
    };

    fetchData();
  }, []);





  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
                <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>
    );
  }


  if (!isAuthenticated.is_authenticated) {
    return <Navigate to="/login" />;
  }

  
  if ((isAuthenticated.is_admin || isAuthenticated.is_staff)) {
    return <Navigate to="/login" />;
  }

  return children;
}


export default UserPrivateRoute;