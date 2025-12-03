import {Router} from 'express'
import {userListController, findUserController, userCreate, updateUserInfo, deleteUserController} from '../controller/userController.js'
import {enforcePermissions} from '../../shared-middleware/authorizationMiddleware.js'  // in container(user-service), it's inside /app/shared-middleware/..
                                                                                                                //so we go from: /app/src/routes/userRoutes.js
import reloadPolicyHandler from '../../shared-middleware/reloadPolicy.js'

const router = Router()

/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

// we should add the security in all the docs so that it can send the 
// token(security) back when that specific endpoint is accessed
/**
 * @swagger
 * /user/list:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.get('/list', enforcePermissions, userListController)

/**
 * @swagger
 * /user/info/{id}:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get info of given id using GET testing
 *      security:
 *          - bearerAuth: [] 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: The user id
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.get('/info/:id', enforcePermissions, findUserController)

/**
 * @swagger
 *  components:
 *      schemas:
 *          personalinfo:
 *              type: object
 *              properties:
 *                  username: 
 *                      type: string
 *                  email: 
 *                      type: string
 *                  profile:
 *                      type: string
 */


// only called when new registers, hence didnt document it for swagger
// better to have a 1-to-1 relation with registering
router.post('/create', userCreate)

/**
 * @swagger
 * /user/update/{id}:
 *  put:
 *      summary: Check if PUT method is working
 *      description: Get info of given id using PUT testing
 *      security:
 *          - bearerAuth: [] 
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
 *                      $ref: '#/components/schemas/personalinfo'
 *      responses:
 *             200:
 *                 description: To test PUT method
 */
router.put('/update/:id',enforcePermissions, updateUserInfo)


/**
 * @swagger
 * /user/delete/{id}:
 *  delete:
 *      summary: Check if DELETE method is working
 *      description: Get info of given id using PUT testing
 *      security:
 *          - bearerAuth: [] 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: The user id  
 *      responses:
 *             200:
 *                 description: To test DELETE method
 */
router.delete('/delete/:id', enforcePermissions, deleteUserController)

router.post('/casbin/reload', reloadPolicyHandler )

export default router