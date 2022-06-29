import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEventsThunk } from "../../store/events";
import './eachevent.css'

function UpdateForm({ event }) {
    const dispatch = useDispatch()
    const userr = useSelector(state => { return state.session.user })
    let user;
    if (userr) user = userr.id

    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [file, setFile] = useState()


    const [hidden, setHidden] = useState('hidden')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const err = []
        if (title.length <= 5) err.push('Title must be longer than 5 characters')
        if (title.length >= 50) err.push('Title must be under 50 characters')
        if (file) {
            const string = file.name.slice(file.name.length - 4, file.name.length)
            if (string !== '.png' && string !== '.jpg' && string !== 'jpeg') err.push('File must be image type: jpg, png')
        }
        if (description.length <= 15) err.push('Description must be longer than 15 characters')
        setErrors(err)
    }, [title, description, file])

    let payload;

    const onSubmit = (e) => {
        e.preventDefault()
        payload = {
            id: event.id,
            title,
            description,
            file
        }
        dispatch(updateEventsThunk(payload))
        setHidden('hidden')
    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setFile(file);
        console.log(file.name)
    };
    return (
        <>
            {user === event.userId && <button className='bunchabuttons' onClick={() => {
                if (hidden === 'hidden') {
                    setHidden('nothidden')
                } else {
                    setHidden('hidden')
                }
            }}>Edit</button>
            }

            <form onSubmit={onSubmit} className={hidden}>
                {errors && errors.map(er => {
                    return (
                        <div>{er}</div>
                    )
                })}
                <label className="labelforforms">Title
                    <input onChange={(e) => { setTitle(e.target.value) }} type='text' value={title}></input>
                </label>
                <label className="labelforforms">Description
                    <textarea onChange={(e) => { setDescription(e.target.value) }} type='text' value={description}></textarea>
                </label>
                <label className="labelforforms">
                    Insert Image
                    <input className='inputsuff' type='file' value={file} onChange={updateFile} />
                </label>
                <button>Submit Changes</button>
            </form>
        </>
    )
}

export default UpdateForm
