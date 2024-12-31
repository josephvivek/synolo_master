import React from "react";
import '../styles/SubNavbar.css'


function SubNavbar(){
    return(
        <>
            <ul className="sub-navbar">
                <li>User Details</li>
                <li>My Teams</li>
                <li>Create Team</li>
                <li>Join Team</li>
                <li>Logout</li>
            </ul>
        </>
    )
}

export default SubNavbar;