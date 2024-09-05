import React, { useState } from 'react';
import { authenticatedAxios } from '../../../utils/axiosConfig'; 

function AddTicket({ fetchTickets,changeOpenStatus }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const userid = localStorage.getItem('userid');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await authenticatedAxios.post('/ticket-create/', {
                title,
                description,
                priority,
                status,
                user: userid
            });
            console.log('Ticket created successfully:', response.data);
            changeOpenStatus()
            setTitle('');
            setDescription('');
            setPriority('');
            setStatus('');
            fetchTickets();
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <div className="w-full p-5 max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:w-96 lg:w-96">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Add a Ticket
            </div>
            <form className="py-4 px-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        rows="4"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="priority">
                        Priority
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <div className="flex items-center justify-center mb-4">
                    <button
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Add Ticket
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTicket;