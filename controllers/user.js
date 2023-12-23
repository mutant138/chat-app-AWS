const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


const signupPage = async (req,res)=>{
    console.log("signupPage")
    res.sendFile('signup.html',{root: 'public/views'})
}
const loginPage = async (req,res)=>{
    console.log("loginPage")
    res.sendFile('login.html',{root: 'public/views'})
}
function isStringInvalid(string) {
    return string === undefined || string.length === 0;
  }

const signup = async (req,res)=>{
    try {
       // console.log(req.body)
        const {name , phone, email, password} = req.body
   if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password) || isStringInvalid(phone)) {
    return res.status(400).json({ err: "Bad parameters. Something is missing" });
  }
  const existingUser = await User.findOne({ where:{email} });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists please login" });
        }
  const saltrounds = 10
  bcrypt.hash(password,saltrounds,async(err,hash)=>{
    await User.create({name , phone, email, password: hash})
    res.status(200).json({ message: "Signup successful" })
  })
  } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    } 
}

const login = async(req,res)=>{
    try {
        const { email , password} = req.body
        if (isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({ err: "Bad parameters. Something is missing" });
        }
        const user = await User.findAll( {where: {email}})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,response)=>{
                if(err){
                    throw new Error(`something went wrong`)
                }
                if(response){
                    res.status(200).json({success: true, message:`User Logged in succesfully` , token: generateAccessToken(user[0].id,user[0].name)})
                }else{
                    return res.status(400).json({success: false, message: `Password is incorrect`})
                }
            })
        }else{
            return res.status(400).json({success: false, message: `User not found`})
          }
    } catch (error) {
        res.status(400).json({message: err,success: false})
    }
}

function generateAccessToken(id,name){
    return jwt.sign({userId: id , name:name, },process.env.TOKEN_SECRET)
}

module.exports = {
    signupPage,
    loginPage,
    signup,
    login
}