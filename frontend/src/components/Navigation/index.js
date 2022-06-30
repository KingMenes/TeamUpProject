import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to='/myevents'>My Events</NavLink>
                <NavLink to='/myrequests'>My Requests</NavLink>
                <li className='lol'>
                    <ProfileButton user={sessionUser} />
                </li>
            </>
        );
    } else {
        sessionLinks = (
            <div className='sessionlinks'>
                <li className='lisession'>
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink className='lisession' to="/signup">Sign Up</NavLink>
                </li>
            </div>
        );
    }


    return (
        <ul className='navul'>
            <li className='nav'>
                <NavLink exact to='/'><img className='logo' src="https://i.ibb.co/Mg591GM/wordart.jpg" alt='TeamUps'></img></NavLink>
            </li>
            <NavLink exact to="/"><img className='home' src='https://brensteamupsproject.s3.amazonaws.com/home.png'></img></NavLink>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
