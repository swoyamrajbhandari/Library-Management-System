import {Router} from 'express'
import {ruleList, ruleInfo, ruleCreate, changeRule, deleteRule} from '../controller/permissionController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { enforcePermissions } from '../../shared-middleware/authorizationMiddleware.js'

const router = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          ruleinfo:
 *              type: object
 *              properties:
 *                  ptype: 
 *                      type: string
 *                  v0: 
 *                      type: string
 *                  v1: 
 *                      type: string
 *                  v2: 
 *                      type: string
 *                  v3: 
 *                      type: string
 *                  v4: 
 *                      type: string
 * 
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
 * /auth/permission/list:
 *  get:
 *      summary: Check if GET method is working
 *      description: This API is used to check if POST method is working or not
 *      security:
 *       - bearerAuth: []
 *      responses:
 *             200:
 *                 description: To test GET method
 */
router.get('/permission/list', authMiddleware, enforcePermissions, ruleList)

/**
 * @swagger
 * /auth/permission/info/{id}:
 *  get:
 *      summary: Check if GET method is working
 *      description: This API is used to check if GET method is working or not
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: The user id
 *      responses:
 *             200:
 *                 description: To test GET method
 */
router.get('/permission/info/:id', authMiddleware, enforcePermissions, ruleInfo)

/**
 * @swagger
 * /auth/permission/newRule:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ruleinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/permission/newRule', authMiddleware, enforcePermissions, ruleCreate)

/**
 * @swagger
 * /auth/permission/update/{id}:
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
 *                      $ref: '#/components/schemas/ruleinfo'
 *      responses:
 *             200:
 *                 description: To test PUT method
 */
router.put('/permission/update/:id', authMiddleware, enforcePermissions, changeRule)

/**
 * @swagger
 * /auth/permission/delete/{id}:
 *  delete:
 *      summary: Check if DELETE method is working
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
 *      responses:
 *             200:
 *                 description: To test DELETE method
 */
router.delete('/permission/delete/:id', authMiddleware, enforcePermissions, deleteRule)

export default router