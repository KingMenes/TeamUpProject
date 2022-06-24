import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventsThunk } from "../../store/events";

export default function () {
    const dispatch = useDispatch()
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


    return (
        <>
            <button onClick={() => { history.goBack() }}>Back</button>
            <button onClick={() => { setEvend(event) }}>reRender(fix LAter)</button>
            <h1>{evend && evend.title}</h1>
            <h2>{evend && evend.User.username}</h2>
            <p>{evend && evend.description}</p>
        </>
    )
}
