// SearchBar.js

import React from 'react';
import "./SearchBar.css"

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <>
            <div className="search-box">
                <div className="search">
                    <div>
                        <input
                            type="text"
                            placeholder="Vyhľadávaj..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <button className='search-btn' onClick={handleSearch}>Hľadaj</button>
            </div>

        </>
    );
}

export default SearchBar;
