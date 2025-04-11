const express = require('express')
const router = express.Router()
const scpAuth = require('../middleware/scpAuth')
const { farmerRegister, allFarmers } = require('../controllers/farmerController')
// router.get('/login', loginSCP)
router.post('/register', scpAuth, farmerRegister)

router.get("/farmers", scpAuth, allFarmers)

module.exports = router