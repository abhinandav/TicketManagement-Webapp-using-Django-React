import React, { useState } from 'react';
import { authenticatedAxios, unauthenticatedAxios } from '../../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

function AdminUpdateModal({ ticket, userId, isOpen, onClose, fetchTickets }) {
    const [updatedTitle, setUpdatedTitle] = useState(ticket.title);
    const [updatedDescription, setUpdatedDescription] = useState(ticket.description);
    const [updatedPriority, setUpdatedPriority] = useState(ticket.priority);
    const [updatedStatus, setUpdatedStatus] = useState(ticket.status);
    const [loading, setLoading] = useState(false);

    

    const navigate = useNavigate();

    const handleUpdate = async () => {
        const updatedTicket = {
            title: updatedTitle,
            description: updatedDescription,
            priority: updatedPriority,
            status: updatedStatus,
            user:userId
        };

        try {
            setLoading(true);
            const res = await unauthenticatedAxios.put(`/admins/user/ticket-update/${ticket.id}/`, updatedTicket);
            if (res.status === 200) {
                onClose();
                fetchTickets();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <h2 className="text-xl font-semibold mb-4">Update Ticket</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={updatedPriority}
                        onChange={(e) => setUpdatedPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                    >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-md"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminUpdateModal;
