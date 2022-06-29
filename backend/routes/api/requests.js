const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const db = require('../../db/models')


router.get('/:eventId(\\d+)/:userId(\\d+)', async (req, res) => {
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

router.get('/getallrequests/:eventId(\\d+)', async (req, res) => {
    const { eventId } = req.params
    const requests = await db.RSVP.findAll({ where: { eventId } })
    const arr = requests.map(ele => {
        return ele.rsvpListId
    })
    const users = await db.User.findAll({ where: { id: arr } })
    res.json(users)
})


router.get('/:userId(\\d+)', asyncHandler(async (req, res) => {
    const { userId } = req.params
    const request = await db.RSVP.findAll({ where: { rsvpListId: userId } })
    const rest = request.map(req => {
        return req.eventId
    })
    const response = await db.Event.findAll({ where: { id: rest } })
    res.json(response)
}))

router.delete('/:eventId(\\d+)/:userId(\\d+)', asyncHandler(async (req, res) => {
    const { eventId, userId } = req.params
    const request = await db.RSVP.findOne({ where: { eventId, rsvpListId: userId } })
    request.destroy()
    res.json(request)
}))


module.exports = router
