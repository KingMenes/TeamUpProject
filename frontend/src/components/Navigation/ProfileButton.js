import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { useHistory } from 'react-router-dom'
function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.replace('/')
    };

    return (
        <>
            <img onClick={openMenu} id='navpic' src='https://brensteamupsproject.s3.amazonaws.com/nav.png'></img>

            {showMenu && (
                <ul className="profile-dropdown">
                    <li className="eachli"><a className='links' href='https://www.linkedin.com/in/brendan-lau-b6952919a/'>LinkedIn</a></li>
                    <li className="eachli"><a className='links' href='https://github.com/BrenLau'>GitHub</a></li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
