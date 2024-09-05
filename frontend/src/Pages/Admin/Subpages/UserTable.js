import React,{useState,useEffect} from 'react'
import { authenticatedAxios, unauthenticatedAxios } from '../../../utils/axiosConfig'
import { Link } from 'react-router-dom'


function UserTable() {
    const[users,setUsers]=useState([])

    const fetchUsers=async()=>{
        const res=await unauthenticatedAxios.get('/admins/users/')
        if (res.status==200){
            setUsers(res.data)
            console.log(res.data);
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])
  return (
    
    <div className="shadow-lg rounded-lg overflow-hidden mx-10 md:mx-10">

      <nav className="flex mt-1 bg-white p-2">
          <ol className="flex flex-wrap text-xs">
              <li className="inline-flex items-center">
                  <span className="inline-flex items-center font-medium text-gray-700 hover:text-gray-900">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                          </path>
                      </svg>
                  </span>
              </li>
              <li>
                  <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd">
                          </path>
                      </svg>
                      <Link to='/admin/'
                          className="flex text-md font-semibold text-gray-700 hover:text-gray-900">All Users
                      </Link>
                  </div>
              </li>
          </ol>
      </nav>    

          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Username</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Joined Date</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              
            {users.map((user,index)=>(
                <tr key={index}>
                    <td className="py-4 px-6 border-b border-gray-200">{user.username}</td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">{user.email}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{new Date(user.date_joined).toLocaleDateString()}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                    <Link to={`usertickets/${user.id}/`}>
                        <span className="bg-green-500 text-white py-2 px-4 font-semibold rounded-full text-xs">View</span>
                    </Link>
                    </td>
                </tr>  
            ))}

            </tbody>
          </table>
        </div>
  )
}

export default UserTable