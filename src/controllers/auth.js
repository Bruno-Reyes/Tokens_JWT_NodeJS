const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const verifyToken = require('./verifyTokens')

router.post('/signup', async (req, res, next) => {
    let { username, email, password } = req.body
    console.log(`Username: ${username} Email: ${email} Password: ${password}`);
    let user = new User({
        username,
        email,
        password
    })

    user.password = await user.encryptPassword(user.password)
    await user.save()
    console.log(user)
    const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 60 * 60 * 24
    })
    console.log(token);
    
    res.json({
        auth: true,
        token
    })
})

router.post('/signin', async (req, res, next) => {
    const { email , password } = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({auth:false,token:null})
    }
    console.log(user);
    
    const auth = await user.decryptPassword(user.password,password) 
    if(!auth){
        return res.status(401).json({auth:false,token:null})
    }

    const token = jwt.sign({id:user._id},secret,{
        expiresIn : 60*60*24
    })

    res.json({auth:true,token})
    
})

router.get('/me', verifyToken,async (req, res, next) => {
    
    const user = await User.findById(req.userId, {password : 0})
    if(!user){
        return res.status(401).json({message:'No user found'})
    }
    res.json({
        message: user
    })
    
})

module.exports = router