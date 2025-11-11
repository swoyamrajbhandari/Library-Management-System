import {registerUser, loginUser, updateUsername, deleteUser} from '../model/authModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios' 
import logger from '../../loggers.js'  

// Registers new users
export const registerController =  async (req, res) => {
    
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 5)
    
    try {
        const user = await registerUser(username, hashedPassword)

        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        // Can be an object or string. 
        // Represents the claims/data you want to store in the token.
        // Do not put sensitive info (like raw passwords) in the payload
        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})  // user = User model(id, username, password)
        
        await axios.post('http://userservice:5001/user', {
            userId: user.id,
            username,
            email: null,
            profile: ''

        }, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        
        logger.info(`New user: ${username} registered`)
        res.json({token})

    } catch (err) {
        logger.error(err.message)
        res.status(409).send("Username already exists")
    }

}

// Logs in if account exists
export const loginController = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await loginUser(username)

        if (!user) {
            logger.warn(`User: ${username} not found`)
            return res.status(404).send("User not found")
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            logger.warn('Password is Invalid')
            return res.status(401).send('Password is Invalid')
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})  // user = User model(id, username, password)
        
        logger.info(`User: ${username} logged in`)
        res.json({token})


    } catch (err) {
        logger.error(err)
        res.sendStatus(404)
    }
}

// Updates registry username if username changed in user db (requested from userController)
export const updateUserController = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body
    
    try{
        const updatedUsername = await updateUsername(id, data)
        logger.info(`Username of id: ${id} updated`)
        return res.status(201).send('Username updated')
    } catch (err) {
        logger.error(err.message)
        logger.warn(`No user found with ID: ${id}`)
        return res.status(501).send('No such ID')

    }




}

// deletes registry entry if entry deleted at user db (requested from userController)
export const deleteUserController = async (req, res) => {
    const id = parseInt(req.params.id)

    try{
        await deleteUser(id)
        logger.info(`User with id: ${id} deleted`)
        return res.status(201).send('User deleted')
    } catch (err) {
        logger.error(err.message)
        logger.warn(`No user found with ID: ${id}`)
        return res.status(501).send('No such ID')

    }
}