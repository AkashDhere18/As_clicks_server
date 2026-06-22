const express = require("express")

const router = express.Router();

const {sendContactMail} = require('../Controllers/contactController')

router.post('/' , sendContactMail)

module.exports = router