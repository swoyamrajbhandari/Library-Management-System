import {userList,findUser, newUserCreate, updateUser, deleteUser} from '../model/userModel.js'
import logger from '../../loggers.js'  
import axios from 'axios'

// Gets the list of all users
export const userListController = async (req, res) => {
    if (req.user.role !== 'admin') {
        logger.warn(`Permission denied: User ${req.user.id} tried to access list of users`)
        return res.send('Permission denied!')
    }
    
    const users = await userList()
    logger.info('Got list of users')
    res.json({users})

}

// Gets the user for given id
export const findUserController = async (req, res) => {
    const id = parseInt(req.params.id)
    if (req.user.role !== 'admin' && id !== req.user.id) {
        logger.warn(`Permission denied: User ${req.user.id} tried to access User ${id}`)
        return res.send('Permission denied!')
    }

    const user = await findUser(id)

    if(!user) {
        logger.warn(`No user found with ID: ${id} `)
        return res.status(404).send('No user found')
    }
    
    logger.info(`Got User with id:${id}`)
    res.json({user})


}

//Creates a user after registration (requested from authController)
export const userCreate = async (req, res) => {
    const info = req.body
    const authId = req.user.id
    console.log(info)
    // console.log(req.user)
    // console.log(req.user.id)
    const profile = await newUserCreate(authId, info)

    logger.info(`User: ${info.username} created`)
    res.json({profile})

}

// Updates the info of given id user (either by themselves or admin)
export const updateUserInfo = async (req, res) => {
    const target = parseInt(req.params.id)
    const data = req.body
    console.log(req.user.role)
    
    if (req.user.role !=='admin' && req.user.id !== target  ) {
        logger.warn(`Permission denied: User ${req.user.id} tried to access User ${target}`)
        return res.status(403).send('Permission denied')
    }

    let update
    try {
        update = await updateUser(target, data)

        await axios.put(`http://authservice:5000/auth/${target}`, {
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

    if (req.user.role !== 'admin' && userId !== req.user.id) {
        logger.warn(`Permission denied: User ${req.user.id} tried to delete User ${target}`)
        return res.send('Permission denied!')
    }
    try{
        await deleteUser(userId)

        await axios.delete(`http://authservice:5000/auth/${userId}`,{
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
