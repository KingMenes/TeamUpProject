import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    const dispatch = useDispatch()
    const [status, updateStatus] = useState(true);

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const events = useSelector(state => {
        return state.events
    })
    const array = events.list

    useEffect(() => {

        dispatch(getEventsThunk())
    }, [dispatch, status])



    if (events && array) {

        return (
            <>
                <NavLink className='createform' to='/events/new'>Create Request</NavLink>
                <h1 className="h1heheh">Team Ups</h1>
                <ul className="culprit">
                    {array.map(event => {
                        return (
                            <NavLink key={event.id} className='navLink' to={`/events/${event.id}`}>
                                <li className="EachEvent">
                                    {user === event.userId && <button onClick={async (e) => {
                                        e.preventDefault()
                                        await dispatch(deleteEventsThunk(event.id))
                                        await updateStatus(!status)
                                    }}>Delete</button>}

                                    {event.User && <h4>{event.title}

                                    </h4>}
                                    <div className="eventtitle">Posted by {event.User.username}</div>
                                    <div className="eventtitle">Event Date: {event.date}</div>
                                </li>
                            </NavLink>

                        )
                    })}
                </ul>
            </>
        )
    } else return null
}
