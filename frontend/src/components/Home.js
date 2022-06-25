import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk, updateEventsThunk } from "../store/events"
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
    console.log(events)
    const [evnts, setEvnts] = useState('')
    const array = Object.values(events)
    if (!evnts) {
        dispatch(getEventsThunk())
    }

    useEffect(() => {
        setEvnts(events)
        // updateStatus(!status)

    }, [dispatch, evnts, status])




    return (
        <>
            <NavLink className='createform' to='/events/new'>Create Request</NavLink>
            <ul>
                {evnts && array.map(event => {
                    return (
                        <li key={event.id} className="EachEvent">
                            {user === event.userId && <button onClick={async (e) => {
                                await dispatch(deleteEventsThunk(event.id))
                                updateStatus(!status)
                            }}>Delete</button>}

                            <h4>
                                {event.User.username} at {event.date} and {event.id}
                            </h4>
                            <div className="eventtitle">{event.title}</div>
                            <NavLink to={`/events/${event.id}`}>Click here to see more details on "{event.title}"</NavLink>
                        </li>

                    )
                })}
            </ul>
        </>
    )
}
