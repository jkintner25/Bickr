import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { AiOutlineCloudUpload } from "react-icons/ai"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            <div className='nav-bar-content'>
                <div className='nav-bar-section'>
                    <NavLink exact to="/photostream">Mickr</NavLink>
                    <NavLink exact to="/albums">Albums</NavLink>
                </div>
                <div className='nav-bar-section'>
                    <NavLink exact to="/uploadPhoto">
                        <AiOutlineCloudUpload color={"white"} size={"28"} />
                    </NavLink>
                    {isLoaded && sessionLinks}

                </div>
            </div>
        </div>
    );
}

export default Navigation;
