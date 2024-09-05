import React,{useEffect,useState} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { set_authentication } from '../../redux/authenticationSlice';
import { jwtDecode } from 'jwt-decode';
import { unauthenticatedAxios } from '../../utils/axiosConfig';

function Login() {
    const {state}=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [message,setMessage]=useState(null)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')
    

    const authentication_user=useSelector(state=>(state.authentication_user))
    console.log(authentication_user.name);
    console.log('auth admin',authentication_user.isAdmin);
    console.log('name',authentication_user.isAuthenticated);
  
    useEffect(() => {
        if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
          console.log('User is already authenticated. Redirecting...');
          navigate('/admin/login');
        }
      }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
      
    
      useEffect(() => {
        if (state) {
          setMessage(state)
          
        }
      }, [state, navigate])
      
    
    

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        setEmailError('')
        setPasswordError('')
        setLoginError('')
    
        const email = event.target.email.value
        const password = event.target.password.value
    
        if (!email.trim()) {
            setEmailError('Email is required *')
        }
    
        if (!password.trim()) {
            setPasswordError('Password is required *');
        }
    
        
    
        const formData = new FormData();
        formData.append('email', event.target.email.value);
        formData.append('password', event.target.password.value);
    
        try {
            const res = await unauthenticatedAxios.post('/admins/login/', formData);
            console.log('Response', res)
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access_token);
                localStorage.setItem('refresh', res.data.refresh_token);
                localStorage.setItem('userid', res.data.userid);
    
                console.log('logined', res.data);
                console.log('Access Token:', res.data.access_token);
                console.log('Refresh Token:', res.data.refresh_token);
    
                dispatch(
                    set_authentication({
                        name: jwtDecode(res.data.access_token).username,
                        isAuthenticated: true,
                        userid:res.data.userid,
                        isAdmin: true,
                        isActive:res.data.userid
                    })
                );
                navigate('/admin');
            }
    
        } catch (error) {
    
            console.error('Error during login:', error);
    
            if (error.response) {
                console.error('Response data:', error.response);
                if (error.response.status === 403) {
                    
                } else {
                    setLoginError('Invalid Credentials');
                }
            } else {
                setLoginError('Invalid Credentials');
            }
        }
    };
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xs sm:mx-auto">
            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit} method='post'>
                <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                                <img src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg" className="w-8" alt="Logo" />
                            </a>
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
                            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">Get started with our app, just start section and enjoy the experience.</span>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400">Username</label>
                            <input type="email"
                                    name="email"
                                    id="email" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="Enter admin email" />
                        </div>
                        {emailError && <span className="text-md text-red-500 mt-1 mb-5">{emailError}</span>}

                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400">Password</label>
                        <input type="password" name="password" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="••••••••" />
                    </div>
                    {passwordError ? (<>
                        {passwordError && <span className="text-md text-red-500 " >{passwordError}</span>}
                        </>):(<>
                        {loginError && <span className="text-md text-red-500 " >{loginError}</span>}
                        </>
                    )}
                    <div className="mt-5">
                        <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                            Login
                        </button>
                    </div>
                </div>
            </form>
            </div>  
        </div>
    );
}

export default Login;
