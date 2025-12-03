import {userList,findUser, newUserCreate, updateUser, deleteUser} from '../model/userModel.js'
import logger from '../utils/loggers.js'  
import axios from 'axios'

// Gets the list of all users
export const userListController = async (req, res) => {
    try {
        const users = await userList()

        if (users.length === 0) {
            logger.warn(`No Users found in database `)
            res.send(`Empty user table`)
        }

        logger.info('Got list of users')
        res.json({users})

    } catch (err) {
        logger.error(`Failed to fetch User list: ${err.message}`)

    }
    
}

// Gets the user for given id
export const findUserController = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const user = await findUser(id)

        if(!user) {
            logger.warn(`No user found with ID: ${id} `)
            return res.status(404).send(`No user found with ID: ${id}`)
        }

        logger.info(`Got User with id:${id}`)
        res.json({user})

    
    } catch (err) {
        logger.error(`Error fetching User info for ID ${id}: ${err.message}`);
        
    }


}

//Creates a user after registration (requested from authController)
export const userCreate = async (req, res) => {
    const info = req.body
    const authId = req.user.id

    try {
        const profile = await newUserCreate(authId, info)
        logger.info(`User: ${info.username} created`)
        res.json({profile})

    } catch (err) {
        logger.error(`Failed to create new User: ${err.message}`)
        
    }

}

// Updates the info of given id user (either by themselves or admin)
export const updateUserInfo = async (req, res) => {
    const target = parseInt(req.params.id)
    const data = req.body

    let update
    try {
        update = await updateUser(target, data)

        await axios.put(`http://authservice:5000/auth/update/${target}`, {
            username: update.username

        }, {
            headers: {
                "Content-type": "application/json"
            }
        })
        logger.info(`User with id: ${target} updated`)
    } catch (err) {
        logger.error(err.message)
        logger.warn(`No user found with ID: ${target} `)
        return res.status(404).send('No user found')
    }
    
    res.json(update)

} 

// Deletes given id user (either by admin or given id user)
export const deleteUserController = async (req, res) => {
    const userId = parseInt(req.params.id)

    try{
        await deleteUser(userId)

        await axios.delete(`http://authservice:5000/auth/delete/${userId}`,{
            headers: {
                "Content-type": "application/json"
            }
        })
        logger.info(`User with id: ${userId} deleted`)
    } catch (err) {
        logger.error(err.message)
        logger.warn(`No user found with ID: ${userId}`)
        return res.status(403).send('ID doesnt exist')
    }
    res.send({"message": "Profile has been deleted"})


}
