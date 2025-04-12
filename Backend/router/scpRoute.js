const express = require('express')
const router = express.Router()
const { scpRegister, scpLogin, verify } = require('../controllers/scpController')
const scpAuth = require('../middleware/scpAuth')

router.post('/register', scpRegister)

router.post('/login', scpLogin)
router.get('/verify',verify );


router.post('/logout', scpAuth, (req, res) => {
    res.clearCookie("token")
    res.json({ message: "logout" })
})

module.exports = router