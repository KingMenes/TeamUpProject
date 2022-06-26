import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk, updateEventsThunk } from "../../store/events";
import './eachevent.css'
import UpdateForm from "./updateform";

export default function () {
    const dispatch = useDispatch()
    const history = useHistory()

    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const { eventId } = useParams()
    const [evend, setEvend] = useState('')

    const events = useSelector(state => {
        return state.events
    })
    const event = events[eventId]

    useEffect(() => {
        dispatch(getEventsThunk())
        setEvend(event)
    }, [dispatch, evend])

    if (event) {
        return (
            <>
                <button onClick={() => { history.goBack() }}>Back</button>
                {
                    user === event.userId && <button onClick={(e) => {
                        dispatch(deleteEventsThunk(event.id))
                        history.push('/')
                    }}>Delete</button>
                }

                <UpdateForm event={event} />
                <h1>{event && event.title}</h1>
                <p>{event && event.description}</p>
            </>
        )
    }
}
