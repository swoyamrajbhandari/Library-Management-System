import {Router} from 'express'
import {registerController, loginController, updateUserController, deleteUserController} from '../controller/authController.js'

const router = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          personalinfo:
 *              type: object
 *              properties:
 *                  username: 
 *                      type: string
 *                  password: 
 *                      type: string
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/personalinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/register', registerController)

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/personalinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/login', loginController)

// For updating username of account if changed in user db
router.put('/:id', updateUserController)

// For deleting username of account if deleted from user db
router.delete('/:id', deleteUserController)


export default router

