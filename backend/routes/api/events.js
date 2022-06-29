const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const db = require('../../db/models')

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

router.get('/', async (req, res) => {
    const list = await db.Event.findAll({ order: [['date', 'ASC']], include: db.User })
    res.json(list)
})

router.post('/', singleMulterUpload('file'), asyncHandler(async (req, res) => {
    const { username, title, description, date } = req.body
    if (req.file) {

        const img = await singlePublicFileUpload(req.file)
        const userId = await db.User.findOne({ where: { username } })
        const id = userId.id
        const event = await db.Event.create({ userId: id, title, description, date, image: img })
        return res.json(event)

    } else {

        const userId = await db.User.findOne({ where: { username } })
        const id = userId.id
        const event = await db.Event.create({ userId: id, title, description, date, })
        return res.json(event)


    }

}))

router.put('/:eventId', asyncHandler(async (req, res) => {
    const eventId = req.body.id
    const event = await db.Event.findByPk(eventId, { include: db.User })
    event.title = req.body.title
    event.description = req.body.description
    await event.save()
    return res.json(event.dataValues)
}))

router.delete('/:eventId', asyncHandler(async (req, res) => {
    const { eventId } = req.params

    const event = await db.Event.findByPk(parseInt(eventId))
    event.destroy()
    return res.json(event)
}))

module.exports = router
