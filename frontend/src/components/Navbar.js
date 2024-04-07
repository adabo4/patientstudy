import React from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
import SearchBar from './SearchBar'

export default function Navbar({ searchQuery, setSearchQuery, handleSearch, fetchAllPatients }) {
    return (
        <>
            <nav>
                <div className="nav-box">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                    <ul>
                        <li><Link to="/home" onClick={fetchAllPatients}>Domov</Link></li>
                        <li><Link to="/add-patient" >Pridaj pacienta</Link> </li>
                        <li><Link to="/" >Odhlás sa</Link> </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
