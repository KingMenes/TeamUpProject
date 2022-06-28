import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllReqsThunk, deleteReqsThunk } from "../../store/requests";
import './myrequests.css'

export default function () {
    const history = useHistory()
    const dispatch = useDispatch()
    const pending = useSelector(state => { return state.requests.list })
    const userr = useSelector(state => { return state.session.user })
    if (!userr) history.push('/login')
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
            <div className='teamrequestsdiv'>
                <h1 className="h1">My TeamUp Requests</h1>
                <ul className="ulteamreq">
                    {pending.map(req => {
                        return (<li className='lireq' key={req.id}>
                            <NavLink to={`/events/${req.id}`}>{req.title}</NavLink>
                            <button className='delbutt' onClick={async (e) => {
                                await dispatch(deleteReqsThunk(req.id, user))
                                setStatus(!status)
                            }}>Delete</button>
                        </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else return null
}
