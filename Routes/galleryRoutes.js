const express = require('express')
const router = express.Router();

const {getGallaryImages} = require('../Controllers/galleryController')

router.get('/:folder' , getGallaryImages);

module.exports = router;
