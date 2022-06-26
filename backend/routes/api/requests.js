const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const db = require('../../db/models')


router.get('/:eventId/:userId', async (req, res) => {
    const { eventId, userId } = req.params
    const requests = await db.RSVP.findOne({ where: { eventId, userId } })
    res.json(requests)
})

router.post('/', asyncHandler(async (req, res) => {
    const { userId, eventId } = req.body
    const request = await db.RSVP.create({ userId, eventId, pending: true })
    res.json(request)
})
)



module.exports = router
