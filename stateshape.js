store = {
    session: {},
    events: {
        eventId: {
            eventData,
            // groupId: "groupType string", //this is categoryId in the db schema image
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
