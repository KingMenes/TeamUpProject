import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './createevents.css'
import { postEventsThunk } from "../../store/events";

export default function () {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const [image, setImage] = useState()
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const username = useSelector(state => state.session.user)

    if (!username) history.push('/login')
    else {

        let payload;
        useEffect(() => {
            const err = []
            if (title.length <= 5) err.push('Title must be longer than 5 characters')
            if (title.length >= 50) err.push('Title must be under 50 characters')
            if (description.length <= 15) err.push('Description must be longer than 15 characters')
            if (!date) err.push('Please select a date')
            let year;
            let month;
            let day;
            if (date) {
                year = date.slice(0, 4)
                if (parseInt(year) < new Date().getFullYear()) err.push('Date must be in the future')
                if (parseInt(year) == new Date().getFullYear()) {
                    month = date.slice(5, 7)
                    if (parseInt(month) < new Date().getMonth() + 1) err.push('Date must be in the future')
                    if (parseInt(month) === new Date().getMonth() + 1) {
                        day = date.slice(8, 11)
                        if (parseInt(day) <= new Date().getDate()) err.push('Date must be in the future')
                    }
                }
            }

            setErrors(err)


        }, [title, description, date, image])

        const onSubmit = (e) => {
            e.preventDefault()
            payload = {
                username,
                title,
                description,
                date,
                image
            }
            dispatch(postEventsThunk(payload))
            history.replace('/')
        }

        return (
            <div className="createcontain">
                <button onClick={() => { history.goBack() }}>Back</button>
                <h1>Create a Team Up event</h1>
                {errors && <ul className="ulcreateform">
                    {errors.map(error => {
                        return (
                            <li key={error} className='errors'>{error}</li>
                        )
                    })}
                </ul>}
                <form className='formcreate' onSubmit={onSubmit}>
                    <label className='labelforforms'>
                        Title
                        <input className='inputstuff' onChange={(e) => setTitle(e.target.value)} type='text' name='title' value={title}>
                        </input>
                    </label>
                    <label className="labelforforms">
                        Description
                        <textarea className='inputstuff' onChange={(e) => { setDescription(e.target.value) }} type='text' name='description' value={description}>
                        </textarea>
                    </label>
                    <label className='labelforforms'>
                        Event Date
                        <input className="inputstuff" type='date' onChange={(e) => { setDate(e.target.value) }}></input>
                    </label>
                    <label className="labelforforms">
                        Image URL
                        <input onChange={(e) => { setImage(e.target.value) }} type='text'></input>
                    </label>

                    <button disabled={errors.length ? true : false}>Submit</button>
                </form>

            </div>
        )
    }
}
