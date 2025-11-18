import {Router} from 'express'
import {registerController, loginController, updateUserController, deleteUserController, changeUserRole} from '../controller/authController.js'
import {authenticizeJWT} from '../middleware/authMiddleware.js'
import {enforcePermissions} from '../../shared-middleware/authorizationMiddleware.js'  // in container(auth-service), it's inside /app/shared-middleware/..
                                                                                                                //so we go from: /app/src/routes/authRoutes.js


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
 * 
 *          roleinfo:
 *              type: object
 *              properties:
 *                  role:
 *                      type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
router.put('/update/:id', updateUserController)

// For deleting username of account if deleted from user db
router.delete('/delete/:id', deleteUserController)

/**
 * @swagger
 * /auth/role/{id}:
 *  put:
 *      summary: Check if PUT method is working
 *      description: // For updating users role (librarian/user)
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/roleinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.put('/role/:id', authenticizeJWT, enforcePermissions, changeUserRole)


export default router

