import {jwtDecode} from "jwt-decode";
import { authenticatedAxios, unauthenticatedAxios } from "./axiosConfig";



const updateAdminToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  console.log('working');

  try {
      const res = await unauthenticatedAxios.post('/token/refresh/', {
          'refresh': refreshToken
      });

      if (res.status === 200) {
          console.log('200');
          console.log(res.data)
          const newAccessToken = res.data.access;
          localStorage.setItem('access', newAccessToken);
          console.log('new===', newAccessToken);
          localStorage.setItem('refresh', res.data.refresh);
          return true;
      } else {
          return false;
      }

  } catch (error) {
      console.error('Error updating access token:', error);
      return false;
  }
};


const fetchisAdmin = async () => {    
    try {
        const res = await authenticatedAxios.get('/user-details/');
         console.log('issuperuser-isauthadmin',res.data.is_superuser);
        return res.data.is_superuser;
  
    } catch (error) {
        return false;
    }
  };
  


  const isAuthAdmin = async () => {
    let accessToken = localStorage.getItem("access");
    console.log('access----', accessToken);

    if (!accessToken) {
        return { name: null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);
    console.log(decoded.exp - currentTime);

    if (decoded.exp > currentTime) {
        let checkAdmin = await fetchisAdmin(); 
        console.log('working 1');
        
        return { name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin };
    } else {
        const updateSuccess = await updateAdminToken();

        if (updateSuccess) {
            accessToken = localStorage.getItem("access"); 
            decoded = jwtDecode(accessToken); 
            let checkAdmin = await fetchisAdmin();
            console.log('working 2'); 
            return { name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin };
        } else {
            return { name: null, isAuthenticated: false, isAdmin: false };
        }
    }
};


export default isAuthAdmin;




