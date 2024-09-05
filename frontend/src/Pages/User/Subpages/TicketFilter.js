import React from 'react';

function TicketFilter({ setFilter }) {

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <select
            id="filterType"
            name="filterType"
            className="w-full h-10 border-2 border-gray-300 focus:outline-none focus:border-gray-300 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            onChange={handleFilterChange}
        >
            <option value="all">All</option>
            <optgroup label="Priority">
                <option value="priority-low">Low</option>
                <option value="priority-medium">Medium</option>
                <option value="priority-high">High</option>
            </optgroup>
            <optgroup label="Status">
                <option value="status-open">Open</option>
                <option value="status-in_progress">In Progress</option>
                <option value="status-resolved">Resolved</option>
            </optgroup>
        </select>
    );
}

export default TicketFilter;
