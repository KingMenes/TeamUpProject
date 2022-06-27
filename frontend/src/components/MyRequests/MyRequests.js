import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getAllReqsThunk, deleteReqsThunk } from "../../store/requests";

export default function () {
    const dispatch = useDispatch()
    const pending = useSelector(state => { return state.requests.list })
    const userr = useSelector(state => { return state.session.user })
    const [list, setList] = useState()
    const [status, setStatus] = useState(true)
    let user;
    if (userr) user = userr.id



    useEffect(() => {
        dispatch(getAllReqsThunk(user))
        setList(pending)
    }, [list, status])

    if (pending) {
        return (
            <>
                <h1>My TeamUp Requests</h1>
                <ul>
                    {pending.map(req => {
                        return (<li key={req.id}>
                            <NavLink to={`/events/${req.id}`}>{req.title}</NavLink>
                            <button onClick={async (e) => {
                                await dispatch(deleteReqsThunk(req.id, user))
                                setStatus(!status)
                            }}>Delete</button>
                        </li>
                        )
                    })}
                </ul>
            </>
        )
    } else return null
}
