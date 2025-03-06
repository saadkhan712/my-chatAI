const express = require('express')
const getUser = require('../controllers/admin-controller')

const router = express.Router()
router.route("/users").get(getUser)

module.exports = router