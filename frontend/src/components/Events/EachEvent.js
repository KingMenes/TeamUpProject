import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Route, NavLink } from "react-router-dom";
import { getEventsThunk, deleteEventsThunk, updateEventsThunk } from "../../store/events";
import './eachevent.css'

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


    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)


    const [hidden, setHidden] = useState('hidden')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getEventsThunk())
        setEvend(event)
    }, [dispatch])

    let payload;
    useEffect(() => {
        const err = []
        if (title.length <= 5) err.push('Title must be longer than 5 characters')
        if (title.length >= 50) err.push('Title must be under 50 characters')
        if (description.length <= 15) err.push('Description must be longer than 15 characters')
        setErrors(err)


    }, [title, description, event])

    const onSubmit = (e) => {
        e.preventDefault()
        payload = {
            id: event.id,
            title,
            description
        }
        dispatch(updateEventsThunk(payload))
        setHidden('hidden')
    }

    return (
        <>
            <button onClick={() => { history.goBack() }}>Back</button>
            <button onClick={() => { setEvend(event) }}>reRender(fix Later)</button>
            {
                user === event.userId && <button onClick={(e) => {
                    dispatch(deleteEventsThunk(event.id))
                    history.push('/')
                }}>Delete</button>
            }
            <button onClick={() => {
                if (hidden === 'hidden') {
                    setHidden('nothidden')
                } else {
                    setHidden('hidden')
                }
            }
            }>Edit</button>
            <form onSubmit={onSubmit} className={hidden}>
                {errors && errors.map(er => {
                    return (
                        <div>{er}</div>
                    )
                })}
                <label>Title
                    <input onChange={(e) => { setTitle(e.target.value) }} type='text' value={title}></input>
                </label>
                <label>Description
                    <textarea onChange={(e) => { setDescription(e.target.value) }} type='text' value={description}></textarea>
                </label>
                <button>Submit Changes</button>
            </form>
            <h1>{event && event.title}</h1>
            <p>{event && event.description}</p>
        </>
    )
}
