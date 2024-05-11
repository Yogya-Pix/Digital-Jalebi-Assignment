import React from 'react'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">
                    Digital Jalebi
                </span>
                <div className="navItems">

                    <button className="navButton">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar