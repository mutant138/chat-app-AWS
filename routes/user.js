const express = require('express')

const userController = require('../controllers/user')



const router = express.Router()

router.get('/',userController.signupPage)
router.post('/signup',userController.signup)
router.get('/login',userController.loginPage)
router.post('/login',userController.login)

module.exports = router