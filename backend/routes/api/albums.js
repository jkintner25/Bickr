const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Album } = require('../../db/models');

const router = express.Router();


router.get(
    '/users/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const albums = await Album.findAll({
            where: { userId }
        });
        res.json(albums)
    })
)

router.get(
    '/:albumId',
    asyncHandler(async (req, res) => {
        const { albumId } = req.params;
        const album = await Album.findByPk(albumId)
        res.json(album)
    })
)

module.exports = router
