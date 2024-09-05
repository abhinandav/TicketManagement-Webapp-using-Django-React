import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/axiosConfig';
import AddTicket from './Subpages/AddTicket';
import TicketList from './Subpages/TicketList';
import SearchBar from './Subpages/SearchBar';
import TicketFilter from './Subpages/TicketFilter';
import Navbar from './Navbar'

function Home() {
    const [tickets, setTickets] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const fetchTickets = async () => {
        const res = await authenticatedAxios.get('/tickets-list');
        if (res.status === 200) {
            setTickets(res.data);
            console.log(res.data);
        }
    };

    const changeOpenStatus = () => {
        setAddOpen(!addOpen);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearchQuery = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'all') {
            return matchesSearchQuery;
        }

        const [type, value] = filter.split('-');
        if (type === 'priority') {
            return matchesSearchQuery && ticket.priority === value;
        }
        if (type === 'status') {
            return matchesSearchQuery && ticket.status === value;
        }

        return matchesSearchQuery;
    });

    return (
        <div>
            <Navbar />
            <div className='w-screen flex flex-col md:flex-row justify-between items-center p-3 bg-gray-100'>
                <div className='flex flex-col w-full h-full'>
                    {/* Search bar, filter, and add button */}
                    <div className='flex flex-col md:flex-row m-3 justify-between items-center bg-gray-200 p-3'>
                        {/* Search Bar */}
                        <div className='w-full mb-3 md:w-auto md:mb-0'>
                            <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
                        </div>

                        {/* Filter and Add Button */}
                        <div className='flex flex-row justify-between w-full md:w-auto items-center'>
                            <TicketFilter setFilter={setFilter} />
                            <div className='ml-4'>
                                {addOpen ? (
                                    <span
                                        onClick={changeOpenStatus}
                                        className='text-white w-24 text-center p-2 bg-gray-500 hover:bg-gray-600 border border-transparent text-sm font-medium rounded-md shadow-sm'>
                                        Close
                                    </span>
                                ) : (
                                    <span
                                        onClick={changeOpenStatus}
                                        className='text-white w-32 text-center px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-transparent text-sm font-medium rounded-md shadow-sm'>
                                        Add
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add Modal */}
                    {addOpen && (
                        <div className='mb-5'>
                            <AddTicket fetchTickets={fetchTickets} changeOpenStatus={changeOpenStatus} />
                        </div>
                    )}

                    {/* Ticket List */}
                    <TicketList tickets={filteredTickets} />
                </div>
            </div>
        </div>
    );
}

export default Home;