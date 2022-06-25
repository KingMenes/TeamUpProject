import { csrfFetch } from './csrf';

const getEvents = '/getEvents'
const postEvent = '/postEvent'
const updateEvent = '/updateEvent'
const deleteEvent = '/deleteEvent'
const getOneEvent = '/justGetOneEvent'


const getEventAction = (list) => ({
    type: getEvents,
    list
})

const postEventAction = (event) => ({
    type: postEvent,
    event
})

const updateEventAction = (data) => ({
    type: updateEvent,
    info: data
})

const deleteEventAction = (event) => ({
    type: deleteEvent,
    event
})

export const getEventsThunk = () => async (dispatch) => {
    const res = await fetch('/api/events', {
        method: 'GET'
    })
    if (res.ok) {
        const events = await res.json()
        dispatch(getEventAction(events))
        return events
    }
}

export const postEventsThunk = (payload) => async (dispatch) => {
    const { username, title, description } = payload

    const res = await csrfFetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, title, description })
    })
    if (res.ok) {
        const event = await res.json()
        dispatch(postEventAction(event))
        return event
    }
}

export const deleteEventsThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const result = await res.json()
        console.log(result)
        dispatch(deleteEventAction(result))
        return result
    }
}

export const updateEventsThunk = (data) => async (dispatch) => {
    const { title, description } = data
    console.log(data)
    console.log(title)
    console.log(description)
    const res = await csrfFetch(`/api/events/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.id, title, description })
    })
    if (res.ok) {
        const result = await res.json()
        console.log(result)
        dispatch(updateEventAction(result))
        return result
    }
}


const eventsReducer = (state = {}, action) => {
    let events;
    switch (action.type) {
        case getEvents:
            events = { ...state }
            action.list.forEach(event => {
                events[event.id] = event
            })
            return events
        case postEvent:
            events = { ...state, [action.event.id]: action.event }
            return events
        case deleteEvent:
            events = { ...state }
            delete events[action.event.id]
            return events
        case updateEvent:
            return { ...state, [action.info.id]: action.info }

        default:
            return state





    }
}

export default eventsReducer
