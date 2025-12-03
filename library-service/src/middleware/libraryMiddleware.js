import jwt from 'jsonwebtoken'
import loggers from '../utils/loggers.js'

function libraryMiddleware(req, res, next) {
    const libToken = req.headers['authorization']

    if (!libToken) {
        loggers.warn(`No token was provided`)
        return res.status(401).send("No token provided")
    }

    const token = libToken.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {return res.status(401).send('Invalid token')}

        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next()

    })

    

}

export default libraryMiddleware