import { csrfFetch } from './csrf';

const getReq = '/getReq'
const postReq = '/postReq'
const updateReq = '/updateEvent'
const deleteReq = '/deleteEvent'


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

export const getReqsThunk = () => async (dispatch) => {
    const res = await fetch('/api/events', {
        method: 'GET'
    })
    if (res.ok) {
        const events = await res.json()
        dispatch(getReqAction(events))
        return events
    }
}

export const postReqsThunk = (payload) => async (dispatch) => {
    const { userId, eventId } = payload
    console.log(userId, eventId)
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

export const deleteReqsThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}`, {
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
        console.log(result)
        dispatch(updateReqsAction(result))
        return result
    }
}


const requestsReducer = (state = {}, action) => {
    let events;
    switch (action.type) {
        case getReq:
            events = { ...state }
            action.list.forEach(event => {
                events[event.id] = event
            })
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
