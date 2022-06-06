import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { AiOutlineCloudUpload } from "react-icons/ai"
import * as sessionActions from '../../store/session';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {

        const credential = 'demo@user.io'
        const password = 'password'

        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/photostream'))
    }

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
                <Button onClick={()=>handleSubmit()}>Demo</Button>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            <div className='nav-bar-content'>
                <div className='nav-bar-section'>
                    <NavLink exact to="/">Mickr</NavLink>
                    <NavLink exact to="/photostream">Photostream</NavLink>
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
