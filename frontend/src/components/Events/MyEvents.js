import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../../store/events"
import './eachevent.css'


export default function MyEvents() {
    const dispatch = useDispatch()
    const history = useHistory()
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



    if (array) {
        const arr = array.filter(ele => {
            return ele.userId === user
        })
        return (
            <>
                <NavLink className='createform' to='/events/new'>Create Request</NavLink>
                <ul className="ulformine">
                    <h1 className="myeventsh1">My Events</h1>
                    {arr.map(event => {
                        return (

                            <NavLink className='navLink' key={event.id} to={`/events/${event.id}`}>

                                <li className="EachEvent">
                                    {user === event.userId && <button onClick={async (e) => {
                                        e.preventDefault()
                                        await dispatch(deleteEventsThunk(event.id))
                                        await updateStatus(!status)

                                        history.push('/myevents')
                                    }}>Delete</button>}

                                    {event.User && <h4>
                                        {event.title}
                                    </h4>}
                                    <div className="eventtitle">{event.User.username}</div>
                                    <div className="eventtitle">Event Date: {event.date}</div>
                                </li>
                            </NavLink>

                        )
                    })}
                </ul>
            </>
        )
    }
}
