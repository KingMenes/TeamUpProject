import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../store/session";
import { getEventsThunk } from "../store/events"
import './home.css'

export default function HomePage() {
    // console.log(eventActions.getEventsThunk)
    const dispatch = useDispatch()

    const events = useSelector(state => {
        return state.events
    })
    const array = Object.values(events)

    useEffect(() => {
        dispatch(getEventsThunk())
    }, [dispatch])
    return (
        <ul>
            {array.map(event => {
                return (

                    <li className="EachEvent">
                        <h3>{event.User.username}</h3>
                        <h4>
                            {event.title}
                        </h4>
                        <div>{event.description}</div>
                    </li>

                )
            })}
        </ul>
    )
}
