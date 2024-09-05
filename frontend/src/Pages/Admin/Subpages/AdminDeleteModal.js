import React from 'react';
import { authenticatedAxios } from '../../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AdminDeleteModal({ ticketId, isOpen, onClose,fetchTickets }) {

    const navigate=useNavigate()

    const handleDelete = async () => {
        try {
            const res = await authenticatedAxios.delete(`/admins/user/ticket-delete/${ticketId}/`);
            if (res.status === 204) { 
                onClose(); 
                fetchTickets()
                  
            }
        } catch (err) {
            console.error('Failed to delete ticket:', err);
            if (err.response) {
                if (err.response.status === 403) {
                    toast.error('You do not have permission to access this ticket.');
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            } else if (err.request) {
                toast.error('No response received from the server.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-sm text-gray-700 mb-4">
                    Are you sure you want to delete this ticket? This action cannot be undone.
                </p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDeleteModal;
