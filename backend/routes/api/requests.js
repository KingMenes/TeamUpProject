const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const db = require('../../db/models')


router.get('/:eventId/:userId', async (req, res) => {
    const { eventId, userId } = req.params
    const requests = await db.RSVP.findOne({ where: { eventId, rsvpListId: userId } })
    console.log(requests)
    res.json(requests)
})

router.post('/', asyncHandler(async (req, res) => {
    const { userId, eventId } = req.body
    const request = await db.RSVP.create({ rsvpListId: userId, eventId, pending: true })
    res.json(request)
})
)


router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params
    const request = await db.RSVP.findAll({ where: { rsvpListId: userId } })
    const rest = request.map(req => {
        return req.eventId
    })
    const response = await db.Event.findAll({ where: { id: rest } })
    res.json(response)
}))

router.delete('/:eventId/:userId', asyncHandler(async (req, res) => {
    const { eventId, userId } = req.params
    const request = await db.RSVP.findOne({ where: { eventId, rsvpListId: userId } })
    request.destroy()
    res.json(request)
}))


module.exports = router
