import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../../store/events";
import './eachevent.css'
import UpdateForm from "./updateform";
import { postReqsThunk, getReqsThunk, getAllReqsThunk } from "../../store/requests";

export default function () {
    const dispatch = useDispatch()
    const history = useHistory()
    const pending = useSelector(state => { return state })
    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const { eventId } = useParams()
    const [evend, setEvend] = useState('')

    const events = useSelector(state => {
        return state.events
    })
    const event = events[eventId]

    console.log(event)

    useEffect(() => {
        dispatch(getAllReqsThunk(user))
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
                {user && user !== event.userId && <button onClick={async () => {
                    const request = await dispatch(getReqsThunk(eventId, user))
                    if (!request) {
                        await dispatch(postReqsThunk({ userId: user, eventId: event.id }))
                        console.log(event.User)
                        window.alert(`Successfully applied to ${event.User.username}'s event ${event.title}`)
                    } else window.alert(`Already applied to ${event.User.username}'s event '${event.title}'`)

                }
                }>Team up request</button>}

                <UpdateForm event={event} />
                <h1>{event && event.title}</h1>
                <p>{event && event.description}</p>
            </>
        )
    }
}
