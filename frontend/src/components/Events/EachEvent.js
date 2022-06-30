import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk } from "../../store/events";
import './eachevent.css'
import UpdateForm from "./updateform";
import { postReqsThunk, getReqsThunk, getAllReqsThunk, getAllThunk } from "../../store/requests";

export default function () {
    const dispatch = useDispatch()
    const history = useHistory()
    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const [status, setStatus] = useState(true)

    const { eventId } = useParams()
    const [evend, setEvend] = useState('')

    const events = useSelector(state => {
        return state.events
    })
    const event = events[eventId]

    const rsvps = useSelector(state => {
        return state.requests.rsvps
    })
    // console.log(rsvps)

    useEffect(() => {
        dispatch(getAllThunk(eventId))
        dispatch(getAllReqsThunk(user))
        dispatch(getEventsThunk())
        setEvend(event)
    }, [dispatch, evend, status])

    if (event) {
        return (
            <>
                <div className="eacheventdiv">
                    <div className="buttondiv">
                        <button className='bunchabuttons' onClick={() => { history.goBack() }}>Back</button>
                        {
                            user === event.userId && <button className='bunchabuttons' onClick={async (e) => {
                                await dispatch(deleteEventsThunk(event.id))
                                await history.push('/')
                            }}>Delete</button>
                        }
                        {user && user !== event.userId && <button className='bunchabuttons' onClick={async () => {
                            const request = await dispatch(getReqsThunk(eventId, user))
                            if (!request) {
                                await dispatch(postReqsThunk({ userId: user, eventId: event.id }))
                                window.alert(`Successfully applied to ${event.User.username}'s event ${event.title}`)
                            } else window.alert(`Already applied to ${event.User.username}'s event '${event.title}'`)
                            await setStatus(!status)
                        }
                        }>Team up request</button>}
                    </div>
                    <h1>{event && event.title}</h1>
                    <p>Event Date: {event.date}</p>
                    <p>{event && event.description}</p>
                    {event.image && <img className='images' src={event.image}></img>}

                    <UpdateForm event={event} />
                    {rsvps && <ul className="listofrsvps">
                        <h2 className='rsvptitle' >RSVP List</h2>
                        {rsvps.map(rsvp => {
                            return (
                                <li className="rsvplist">{rsvp.username}</li>
                            )
                        })}
                    </ul>}
                </div>
            </>
        )
    }
}
