const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const photosRouter = require('./photos.js');
const albumsRouter = require('./albums')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/photos', photosRouter)
router.use('/albums', albumsRouter)

module.exports = router;
