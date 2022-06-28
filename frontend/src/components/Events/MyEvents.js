import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../../store/events"

export default function MyEvents() {
    const dispatch = useDispatch()
    const [status, updateStatus] = useState(true);

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const events = useSelector(state => {
        return state.events
    })

    const array = events.list



    console.log(array)



    useEffect(() => {

        dispatch(getEventsThunk())
    }, [dispatch])



    if (array) {
        const arr = array.filter(ele => {
            return ele.userId === user
        })
        return (
            <>
                <NavLink className='createform' to='/events/new'>Create Request</NavLink>
                <ul>
                    {arr.map(event => {
                        return (

                            <li key={event.id} className="EachEvent">
                                {user === event.userId && <button onClick={(e) => {
                                    dispatch(deleteEventsThunk(event.id))
                                    updateStatus(!status)
                                }}>Delete</button>}

                                {event.User && <h4>
                                    {event.User.username}
                                </h4>}
                                <div className="eventtitle">{event.title}</div>
                                <div className="eventtitle">Event Date: {event.date}</div>
                                <NavLink to={`/events/${event.id}`}>Click here to see more details on "{event.title}"</NavLink>
                            </li>

                        )
                    })}
                </ul>
            </>
        )
    }
}
