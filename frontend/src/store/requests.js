import { csrfFetch } from './csrf';

const getReq = '/getReq'
const postReq = '/postReq'
const updateReq = '/updateReq'
const deleteReq = '/deleteReq'
const getOneReq = '/justGetOneReq'

const getOneReqAction = (req) => ({
    type: getOneReq,
    req
})

const getReqAction = (list) => ({
    type: getReq,
    list
})

const postReqAction = (event) => ({
    type: postReq,
    event
})

const updateReqsAction = (data) => ({
    type: updateReq,
    info: data
})

const deleteReqAction = (event) => ({
    type: deleteReq,
    event
})

export const getReqsThunk = (eventId, userId) => async (dispatch) => {
    const request = await fetch(`/api/requests/${eventId}/${userId}`)
    if (request.ok) {
        const found = await request.json()
        dispatch(getOneReqAction(found))
        return found
    }
}

export const getAllReqsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/requests/${userId}`)
    if (res.ok) {
        const requests = await res.json()
        console.log(requests)
        dispatch(getReqAction(requests))
        return requests
    }
}

export const postReqsThunk = (payload) => async (dispatch) => {
    const { userId, eventId } = payload
    const res = await csrfFetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId })
    })
    if (res.ok) {
        const event = await res.json()
        dispatch(postReqAction(event))
        return event
    }
}

export const deleteReqsThunk = (eventId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/requests/${eventId}/${userId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const result = await res.json()
        dispatch(deleteReqAction(result))
        return result
    }
}

export const updateReqsThunk = (data) => async (dispatch) => {
    const { title, description } = data

    const res = await csrfFetch(`/api/events/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.id, title, description })
    })
    if (res.ok) {
        const result = await res.json()
        console.log(result.Events)
        dispatch(updateReqsAction(result))
        return result
    }
}


const requestsReducer = (state = {}, action) => {
    let events;
    switch (action.type) {
        case getOneReq:
            return { ...state }
        case getReq:
            events = { ...state, list: action.list }
            return events
        case postReq:
            events = { ...state, [action.event.id]: action.event }
            return events
        case deleteReq:
            events = { ...state }
            delete events[action.event.id]
            return events
        case updateReq:
            return { ...state, [action.info.id]: action.info }

        default:
            return state
    }
}

export default requestsReducer
