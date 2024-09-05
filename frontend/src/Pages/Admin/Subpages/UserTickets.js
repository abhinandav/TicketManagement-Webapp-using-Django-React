import React, { useEffect, useState } from 'react';
import { unauthenticatedAxios } from '../../../utils/axiosConfig';
import AdminUpdateModal from './AdminUpdateModal';
import { Link, useParams } from 'react-router-dom';
import AdminDeleteModal from './AdminDeleteModal';

function UserTickets() {
    const [tickets, setTickets] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const { id } = useParams(); 

    const fetchTickets = async () => {
        try {
            const res = await unauthenticatedAxios.get(`/admins/user/${id}/tickets/`);
            if (res.status === 200) {
                setTickets(res.data);
                console.log(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleOpenUpdate = (ticket) => {
        setSelectedTicket(ticket);
        setOpenUpdate(true);
    };

    const handleOpenDelete = (ticket) => {
        setSelectedTicket(ticket);
        console.log(selectedTicket);
        
        setOpenDelete(!openDelete);
    };

    return (
        <div className="shadow-lg rounded-lg  mx-10 md:mx-10 mb-40">

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

              <li>
                  <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd">
                          </path>
                      </svg>
                      <span
                          className="flex text-md font-semibold text-gray-700 hover:text-gray-900">Tickets
                      </span>
                  </div>
              </li>
          </ol>
        </nav>  

            <table className="w-full table-fixed">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Title</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Description</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Priority</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Created Date</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Update</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Delete</th>

                    </tr>
                </thead>
                <tbody className="bg-white">
                {tickets.length > 0 ? tickets.map((ticket, index) => (
                    <tr key={index}>
                        <td className="py-4 px-6 border-b border-gray-200">{ticket.title}</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">{ticket.description}</td>
                        <td className="py-4 px-6 border-b border-gray-200">{ticket.status}</td>
                        <td className="py-4 px-6 border-b border-gray-200">{ticket.priority}</td>
                        <td className="py-4 px-6 border-b border-gray-200">{new Date(ticket.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <button
                                onClick={() => handleOpenUpdate(ticket)}
                                className="bg-indigo-500 text-white py-2 px-4 font-semibold rounded-full text-xs"
                            >
                                Update
                            </button>
                        </td>

                        <td className="py-4 px-6 border-b border-gray-200">
                            <button
                                onClick={() => handleOpenDelete(ticket)}
                                className="bg-red-500 text-white py-2 px-4 font-semibold rounded-full text-xs"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="7" className="py-4 px-6 text-center text-gray-600">No tickets found.</td>
                    </tr>
                )}
            </tbody>

            </table>
            {openUpdate && (
                <AdminUpdateModal
                    ticket={selectedTicket}
                    userId={id}
                    isOpen={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    fetchTickets={fetchTickets}
                />
            )}
            {openDelete && (
            <AdminDeleteModal ticketId={selectedTicket.id} isOpen={openDelete} onClose={()=>handleOpenDelete(false)} fetchTickets={fetchTickets}/>
            )}
        </div>
    );
}

export default UserTickets;
