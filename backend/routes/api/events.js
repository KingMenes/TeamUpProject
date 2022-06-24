const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

router.get('/', (req, res) => {

})

router.post('/', asyncHandler(async (req, res) => {

}))

router.put('/:eventId', asyncHandler(async (req, res) => {

}))

router.delete('/:eventId', asyncHandler(async (req, res) => {

}))

module.exports = router
