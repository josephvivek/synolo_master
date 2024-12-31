import React from "react";
import '../styles/Navbar.css'
import account_circle from '../assets/account_circle.png'

function Navbar(){
    return(
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <p className="logo share-tech-regular">SYNOLO</p>
                </div>
                <div className="nav-middle">
                    <ul className="nav-list">
                        <li>Home</li>
                        <li>Project</li>
                        <li>Design</li>
                        <li>VCS</li>
                    </ul>
                </div>
                <div className="nav-right">
                    <img src={account_circle} alt="" />
                    <div className="tooltip">Vivek joseph</div>
                    <div className="tooltip-arrow"></div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;