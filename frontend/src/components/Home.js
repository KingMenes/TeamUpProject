import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../store/session";
import { getEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    // console.log(eventActions.getEventsThunk)
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
            <button className='createbutton'>Create request</button>
            <ul>
                {evnts && array.map(event => {
                    return (

                        <li className="EachEvent">
                            <h4>
                                {/* {event.title} */}
                                {event.User.username} at {event.date}
                            </h4>
                            <div className="eventtitle">{event.title}</div>
                        </li>

                    )
                })}
            </ul>
        </>
    )
}
