store = {
    session: {},
    events: {
        eventId: {
            eventData,
            host,
            description,
        },
        rsvps: {
            rsvpId: {
                rsvpData,
                user: { userData },
                event: { eventData },
                pending: Boolean
            },
        },
    },
}
