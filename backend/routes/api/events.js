const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const db = require('../../db/models')

router.get('/', async (req, res) => {
    const list = await db.Event.findAll({ include: db.User })
    // console.log(list)
    res.json(list)
})

router.post('/', asyncHandler(async (req, res) => {
    const { username, title, description } = req.body
    const user = (username.username)
    console.log(user)
    const userId = await db.User.findOne({ where: { username: user } })
    const id = userId.id
    console.log(id)
    // console.log(req.body)
    const event = await db.Event.create({ userId: id, title, description, date: new Date() })
    return res.json(event)
}))

router.put('/:eventId', asyncHandler(async (req, res) => {

}))

router.delete('/:eventId', asyncHandler(async (req, res) => {

}))

module.exports = router
