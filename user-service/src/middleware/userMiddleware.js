import jwt from 'jsonwebtoken'

export function userMiddleware(req, res, next) {
    const authToken = req.headers['authorization']

    if (!authToken) {return res.status(401).send("No token provided")}

    const token = authToken.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {return res.status(401).send('Invalid token')}
        
        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next()

    })

}

export default userMiddleware
