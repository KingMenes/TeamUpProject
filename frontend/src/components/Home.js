import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    const dispatch = useDispatch()

    const events = useSelector(state => {
        return state.events
    })
    const [evnts, setEvnts] = useState('')
    const array = Object.values(events)

    useEffect(() => {
        dispatch(getEventsThunk())
        setEvnts(events)
    }, [dispatch, evnts])
    return (
        <>
            <NavLink className='createform' to='/events/new'>Create Request</NavLink>
            <ul>
                {evnts && array.map(event => {
                    return (

                        <li key={event.id} className="EachEvent">
                            <h4>
                                {event.User.username} at {event.date}
                            </h4>
                            <div className="eventtitle">{event.title}</div>
                            <NavLink to={`/events/${event.userId}`}>Click here to see more details on "{event.title}"</NavLink>
                        </li>

                    )
                })}
            </ul>
        </>
    )
}
