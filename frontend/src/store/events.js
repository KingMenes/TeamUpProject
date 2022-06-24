import { csrfFetch } from './csrf';

const getEvents = '/getEvents'
const postEvent = '/postEvent'
const updateEvent = '/updateEvent'
const deleteEvent = '/deleteEvent'
const getOneEvent = '/justGetOneEvent'

const justGetOneEvent = (id) => ({
    type: getOneEvent,
    id
})

const getEventAction = (list) => ({
    type: getEvents,
    list
})

const postEventAction = (data) => ({
    type: postEvent,
    info: data
})

const updateEventAction = (data) => ({
    type: updateEvent,
    info: data
})

const deleteEventAction = (eventId) => ({
    type: deleteEvent,
    info: eventId
})

export const getEventsThunk = () => async (dispatch) => {
    const res = await fetch('/api/events', {
        method: 'GET'
    })
    if (res.ok) {
        const events = await res.json()
        // console.log(events)
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
        // console.log(event)
        return event
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
        case postEventAction:
            events = { ...state, [action.event.id]: action.event }
            return events

        default:
            return state





    }
}

export default eventsReducer
