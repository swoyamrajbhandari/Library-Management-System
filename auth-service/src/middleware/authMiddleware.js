import jwt from 'jsonwebtoken'
import loggers from '../../loggers.js'

export function authenticizeJWT(req, res, next) {
    const authToken = req.headers['authorization']

    if (!authToken) {
        loggers.warn(`No token was provided`)
        return res.status(401).send("No token provided")
    }

    const token = authToken.split(' ')[1]
    const valid = jwt.verify(token, process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {return res.status(401).send('Invalid token')}

        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next()

    })
}

