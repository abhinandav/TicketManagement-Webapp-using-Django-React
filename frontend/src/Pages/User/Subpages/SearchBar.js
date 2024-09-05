import React from 'react';

const SearchBar = ({ handleSearch, searchQuery }) => {
    return (
        <div className="w-full sm:w-70 md:w-90 lg:w-96 mx-auto">
            <div className="relative z-30 text-base text-black">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="search with title..."
                    className="mt-2 shadow-md focus:outline-none border-1 rounded-2xl py-3 px-6 block w-full"
                />
            </div>
        </div>
    );
};

export default SearchBar;