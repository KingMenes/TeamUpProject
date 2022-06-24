import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './createevents.css'
import { postEventsThunk } from "../../store/events";
import { restoreCSRF } from "../../store/csrf";

export default function () {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const username = useSelector(state => state.session.user)
    console.log(username)
    let payload;
    useEffect(() => {
        const err = []
        if (title.length <= 5) err.push('Title must be longer than 5 characters')
        if (title.length >= 50) err.push('Title must be under 50 characters')
        if (description.length <= 15) err.push('Description must be longer than 15 characters')
        setErrors(err)


    }, [title, description])

    const onSubmit = (e) => {
        e.preventDefault()
        payload = {
            username,
            title,
            description
        }
        dispatch(postEventsThunk(payload))
        history.push('/')
    }

    return (
        <>
            <button onClick={() => { history.goBack() }}>Back</button>
            {errors && <ul>
                {errors.map(error => {
                    return (
                        <li key={error} className='errors'>{error}</li>
                    )
                })}
            </ul>}
            <form onSubmit={onSubmit}>
                <label>
                    Title
                    <input onChange={(e) => setTitle(e.target.value)} type='text' name='title' value={title}>
                    </input>
                </label>
                <label>
                    Description
                    <textarea onChange={(e) => { setDescription(e.target.value) }} type='text' name='description' value={description}>
                    </textarea>
                </label>
                <button disabled={errors.length ? true : false}>Submit</button>
            </form>

        </>
    )
}
