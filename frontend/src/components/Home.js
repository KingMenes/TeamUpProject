import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    const dispatch = useDispatch()
    const [status, updateStatus] = useState(true);
    const [page, setPage] = useState(0)
    const [string, setString] = useState('')

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const events = useSelector(state => {
        return state.events
    })

    let tempArr

    if (events.list) {
        const temp = events.list.slice()
        tempArr = temp.filter(event => {
            return event.title.toLowerCase().includes(string.toLowerCase()) || event.User.username.toLowerCase().includes(string.toLowerCase())
        })
    }


    let array;
    if (tempArr) {
        array = tempArr.slice(page * 5, (page + 1) * 5)
    }



    useEffect(() => {

        dispatch(getEventsThunk())
    }, [dispatch, status, page])



    if (events && array) {

        return (
            <>
                <NavLink className='createform' to='/events/new'>Create Request</NavLink>
                <h1 className="h1heheh">Team Ups</h1>
                <div id='searchbar'>
                    <label className="filter">Filter: <input onChange={(e) => { setString(e.target.value) }}></input></label>
                </div>
                <div className="backforthdiv">

                    <button className='backandforth' onClick={() => {
                        if (page > 0) {
                            setPage(page - 1)
                        }
                    }}>←</button>
                    <button className='backandforth' onClick={() => {
                        if (page + 1 < events.list.length / 5) {
                            setPage(page + 1)
                        }
                    }}>→</button>
                </div>
                <ul className="culprit">
                    {array.map(event => {
                        return (
                            <NavLink key={event.id} className='navLink' to={`/events/${event.id}`}>
                                <li className="EachEvent">
                                    {user === event.userId && <button className='delb delbutt' onClick={async (e) => {
                                        e.stopPropagation()
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
                    <div id='page'>Page: {page + 1}</div>
                </ul>
            </>
        )
    } else return null
}
