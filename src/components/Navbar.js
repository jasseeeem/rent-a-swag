import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../services/Firebase.js';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Rent A Swag</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        {user ?
                            <>
                                <li className="nav-item ps-4">
                                    <NavLink to="/add" className="nav-link" >Add Swag</NavLink>
                                </li>
                                <li className="nav-item ps-4">
                                    <NavLink to="/profile">
                                        <img className="profile-pic" src={user.photoURL} alt="" />
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item ps-4">
                                    <NavLink to="/login" className="nav-link">Log In</NavLink>
                                </li>
                                <li className="nav-item ps-4">
                                    <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;