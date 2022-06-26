const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events')
const requestsRouter = require('./requests')
router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/events', eventsRouter)
router.use('/requests', requestsRouter)

module.exports = router;
