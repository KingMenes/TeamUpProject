import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../../store/events";

export default function () {
    const dispatch = useDispatch()

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id
    console.log(user)

    const { eventId } = useParams()
    const [evend, setEvend] = useState('')



    const events = useSelector(state => {
        return state.events
    })
    const event = events[eventId]
    const history = useHistory()

    useEffect(() => {
        dispatch(getEventsThunk())
        setEvend(event)
    }, [dispatch])
    // const eventId = evend.id
    // if (user === evend)


    return (
        <>
            <button onClick={() => { history.goBack() }}>Back</button>
            <button onClick={() => { setEvend(event) }}>reRender(fix LAter)</button>
            {user === event.userId && <button onClick={(e) => {
                dispatch(deleteEventsThunk(event.id))
                history.push('/')
            }}>Delete</button>}
            <h1>{event && event.title}</h1>
            <h2>{event && event.User.username}</h2>
            <p>{event && event.description}</p>
        </>
    )
}
