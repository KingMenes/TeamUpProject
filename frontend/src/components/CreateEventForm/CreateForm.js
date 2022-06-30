import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './createevents.css'
import { getEventsThunk, postEventsThunk } from "../../store/events";

export default function () {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const [image, setImage] = useState()
    const [errors, setErrors] = useState([])
    const [file, setFile] = useState(null)
    const [err, setErr] = useState('onlyiferrors')

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
            if (file) {
                const string = file.name.slice(file.name.length - 4, file.name.length)
                if (string !== '.png' && string !== '.jpg' && string !== 'jpeg') err.push('File must be image type: jpg, png')
            }
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
            if (errors.length > 0) {
                setErr('onlyiferrors')
            } else setErr('')

        }, [title, description, date, image, file, errors])

        const onSubmit = async (e) => {
            e.preventDefault()
            payload = {
                username: username.username,
                title,
                description,
                date,
                image,
                file
            }
            await dispatch(postEventsThunk(payload))
            await dispatch(getEventsThunk())
            await history.replace(`/`)
        }

        const updateFile = (e) => {
            const file = e.target.files[0];
            if (file) setFile(file);
        };

        return (
            <div className="createcontain">
                <h1 className="titleforcreate">Create a Team Up event</h1>
                {errors && <ul className={`ulcreateform ${err}`}>
                    {errors && errors.map(error => {
                        return (
                            <li key={error} className='errors'>{error}</li>
                        )
                    })}
                </ul>}
                <form className='formcreate' onSubmit={onSubmit}>
                    <button className='backbutton' onClick={() => { history.goBack() }}>Back</button>
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
                        Insert Image
                        <input className='inputsuff' type='file' onChange={updateFile} />
                    </label>

                    <button disabled={errors.length ? true : false}>Submit</button>
                </form>

            </div>
        )
    }
}
