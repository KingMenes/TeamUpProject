import { csrfFetch } from './csrf';

const getEvents = '/getEvents'
const postEvent = '/postEvent'
const updateEvent = '/updateEvent'
const deleteEvent = '/deleteEvent'

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


const eventsReducer = (state = {}, action) => {
    let events;
    switch (action.type) {
        case getEvents:
            events = { ...state }
            action.list.forEach(event => {
                events[event.id] = event
            })
            return events
        default:
            return state





    }
}

export default eventsReducer
