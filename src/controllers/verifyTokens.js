const jwt = require('jsonwebtoken')
const {secret} = require('../config')

function verifyTokens(req,res,next) {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token,secret)
    req.userId = decoded.id
    next()
}

module.exports = verifyTokens