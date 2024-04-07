// SearchBar.js

import React, { useState } from 'react';
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
                <li><button className='search-btn' onClick={handleSearch}>Hľadaj</button></li>
            </div>

        </>
    );
}

export default SearchBar;
