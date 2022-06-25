import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Route, NavLink } from "react-router-dom";
import { getEventsThunk, updateEventsThunk } from "../../store/events";

export default function UpdateForm({ event }) {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)


    const [hidden, setHidden] = useState('hidden')
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const err = []
        if (title.length <= 5) err.push('Title must be longer than 5 characters')
        if (title.length >= 50) err.push('Title must be under 50 characters')
        if (description.length <= 15) err.push('Description must be longer than 15 characters')
        setErrors(err)
        dispatch(updateEventsThunk(payload))
        setHidden('hidden')
    }, [title, description, event])

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            id: event.id,
            title,
            description
        }
    }


    return (
        <>
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
        </>
    )

}
