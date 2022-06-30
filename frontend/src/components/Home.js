import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    const dispatch = useDispatch()
    const [status, updateStatus] = useState(true);
    const [page, setPage] = useState(0)

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const events = useSelector(state => {
        return state.events
    })
    // const array = events.list
    let array;
    if (events.list) {
        array = events.list.slice(page * 5, (page + 1) * 5)
    }

    // console.log(events.list.slice(0, 5))
    if (events.list) {

        console.log(events.list.length / 5)
        console.log(page)
    }

    useEffect(() => {

        dispatch(getEventsThunk())
    }, [dispatch, status, page])



    if (events && array) {

        return (
            <>
                <NavLink className='createform' to='/events/new'>Create Request</NavLink>
                <h1 className="h1heheh">Team Ups</h1>
                <button className='backandforth' onClick={() => {
                    if (page > 0) {
                        setPage(page - 1)
                    }
                }}>Previous Page</button>
                <button className='backandforth' onClick={() => {
                    if (page + 1 < events.list.length / 5) {
                        setPage(page + 1)
                    }
                }}>Next Page</button>
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
