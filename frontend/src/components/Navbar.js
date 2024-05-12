import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
import SearchBar from './SearchBar'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function Navbar({ searchQuery, setSearchQuery, handleSearch, fetchAllPatients }) {

    const [show, setShow] = useState(false);

    function toggleMenu() {
        setShow(!show)

    }

    return (
        <>
            <nav>
                <div className="nav-box">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                    <div className={`nav-items ${show ? 'show' : 'hide'}`} >
                        <ul>
                            <li><Link to="/home" onClick={fetchAllPatients}>Domov</Link></li>
                            <li><Link to="/add-patient" onClick={toggleMenu} >Pridaj pacienta</Link> </li>
                            <li><Link to="/" >Odhlás sa</Link> </li>
                        </ul>
                    </div>
                    <div className="hamburger-icon" onClick={toggleMenu} ><GiHamburgerMenu></GiHamburgerMenu></div>
                    {show && <div className="cross-icon" onClick={toggleMenu}><RxCross1 /></div>}
                </div>
            </nav>
        </>
    )
}
