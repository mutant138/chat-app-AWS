const express = require('express')

const chatController = require('../controllers/chat')
const userauthentication = require('../middlewares/auth')


const router = express.Router()


router.get('/home',chatController.chatPage)
router.post('/user/send-message',userauthentication.authenticate,chatController.chatMessage)
router.get('/user/allmessages',chatController.getAllMessages)






module.exports = router