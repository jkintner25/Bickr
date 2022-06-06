const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

const { Photo } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const photo = await Photo.create(req.body);
        res.json(photo)
    })
);

router.get(
    '/all',
    asyncHandler(async (req, res) => {
        const photos = await Photo.findAll()
        return res.json(photos)
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const photo = await Photo.findByPk(id)
        return res.json(photo)
    })
);

router.put(
    '/edit/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const {description} = req.body;
        const photo = await Photo.findByPk(id);
        photo.description = description;
        await photo.save()
        return res.json(photo)
    })
)

router.delete(
    '/remove/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        // const { user } = req
        const photo = await Photo.findByPk(id);
        // if (user.id === photo.userId){
        await photo.destroy()
        // } else {
        //     new Error('You do not have permission to delete this photo.')
        // }
        return res.json(photo)
    })
)

module.exports = router;
