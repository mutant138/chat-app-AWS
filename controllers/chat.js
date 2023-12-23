const Chat = require('../models/chat')
const User = require('../models/user')

const chatPage = async(req,res)=>{
    console.log('chatPage')
    res.sendFile('index.html',{root :'public/views'})
}

const chatMessage = async(req,res,next)=>{
    try {
        const {userMessage } = req.body
        console.log('Body of message is >>>>>', userMessage)

        const chatMessage = await Chat.create({
            chatMessage: userMessage,
            userId : req.user.id
        })
        res.status(200).json({ message : "Message successfully stored"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to send message" });
    }
}

const getAllMessages = async(req,res)=>{
    try {
        const messages = await Chat.findAll()
        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}













module.exports ={
    chatPage,
    chatMessage,
    getAllMessages
}