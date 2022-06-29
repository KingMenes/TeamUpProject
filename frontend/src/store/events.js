import { csrfFetch } from './csrf';

const getEvents = '/getEvents'
const postEvent = '/postEvent'
const updateEvent = '/updateEvent'
const deleteEvent = '/deleteEvent'


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
    const { username, title, description, date, file } = payload
    const formData = new FormData();
    formData.append('username', username)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('date', date)

    if (file) {
        formData.append('file', file)
    }

    const res = await csrfFetch('/api/events', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const event = await res.json()
    dispatch(postEventAction(event))
    return event

}

export const deleteEventsThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const result = await res.json()
        dispatch(deleteEventAction(result))
        return result
    }
}

export const updateEventsThunk = (data) => async (dispatch) => {
    const { title, description, file } = data

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
            events = { ...state, list: action.list }
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
