import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';
import Navbar from '../Navbar';

function TicketDetails() {
    const [ticket, setTicket] = useState(null); 
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await authenticatedAxios.get(`/ticket/${id}/`);
            if (res.status === 200) {
                setTicket(res.data);
                console.log(res.data);
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    navigate('/');
                    toast.error('You do not have permission to access this ticket.');
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            } else if (err.request) {
                toast.error('No response received from the server.');
            } else {
                toast.error('An unexpected error occurred.');
            }
            console.error(err);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [id]);

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
    };

    const handleOpenUpdate = () => {
        setOpenUpdate(!openUpdate);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">No ticket details available.</p>
            </div>
        );
    }

    return (
        <>
        <Navbar/>
        <div className="mx-4 mt-10 md:mx-20 lg:mx-40 xl:mx-60 flex justify-center items-center">
            <div className="bg-white overflow-hidden shadow rounded-lg border box">
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Ticket Details
                        </h3>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        You can check out the details and also update them
                    </p>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row justify-between">
                        <span className="mt-1 ml-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                            Title
                        </span>
                        <span className="text-sm mr-10 font-medium text-blue-500 capitalize max-w-96">
                            {ticket.title}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row justify-between">
                        <span className="mt-1 ml-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Description
                        </span>
                        <span className="text-sm mr-10 font-medium text-blue-500 capitalize max-w-96">
                            {ticket.description}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row justify-between">
                        <span className="mt-1 ml-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Status
                        </span>
                        <span
                            className={`text-sm mr-10 font-medium ${
                                ticket.status === 'open'
                                    ? 'text-green-400'
                                    : ticket.status === 'resolved'
                                    ? 'text-red-400'
                                    : 'text-blue-400'
                            }`}
                        >
                            {ticket.status}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row justify-between">
                        <span className="mt-1 ml-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Priority
                        </span>
                        <span
                            className={`text-sm mr-10 font-medium ${
                                ticket.priority === 'low'
                                    ? 'text-yellow-400'
                                    : ticket.priority === 'medium'
                                    ? 'text-teal-400'
                                    : 'text-red-400'
                            }`}
                        >
                            {ticket.priority}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row justify-between">
                        <span className="mt-1 ml-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Created Date
                        </span>
                        <span className="text-sm mr-10 font-medium text-gray-500">
                            {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="py-3 flex flex-row xs:justify-between lg:justify-end">
                        <button
                            onClick={handleOpenUpdate}
                            className="mx-5 text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 "
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleOpenDelete}
                            className="text-sm mx-5 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 py-2 font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
                        >
                            Delete
                        </button>

                        {openDelete && <DeleteModal ticketId={id} isOpen={openDelete} onClose={handleOpenDelete} />}
                        {openUpdate && <UpdateModal ticketId={id} isOpen={openUpdate} onClose={handleOpenUpdate} ticket={ticket} fetchTickets={fetchTickets} />}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default TicketDetails;