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
            <li className='lol'>
                <ProfileButton user={sessionUser} />
            </li>
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
        <div className='uldiv'>
            <ul className='navul'>
                <li className='nav'>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <img className='logo' src="https://i.ibb.co/Mg591GM/wordart.jpg" alt='TeamUps'></img>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
