import {Router} from 'express'
import {getRoutes, getRoute, checkResource, syncRoute, updatedRoute} from '../controller/routeController.js'
import routeMiddleware from '../middleware/routeMiddleware.js'
import { enforcePermissions } from '../../shared-middleware/authorizationMiddleware.js'

const router = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          routeinfo:
 *              type: object
 *              properties:
 *                  resource: 
 *                      type: string
 *                  action: 
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
 * /route/list:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.get('/list', routeMiddleware, enforcePermissions, getRoutes)

/**
 * @swagger
 * /route/info/{id}:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
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
router.get('/info/:id', routeMiddleware, enforcePermissions, getRoute)

/**
 * @swagger
 * /route/resource:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.post('/resource', checkResource)  // gets resource and action from api_routes table (using method, path)
// for these 2 post routes, no middleware and enforcePermissions as they are called through axios (nested http requests)
router.post('/sync', syncRoute)

/**
 * @swagger
 * /route/update/{id}:
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
 *                      $ref: '#/components/schemas/routeinfo'
 *      responses:
 *             200:
 *                 description: To test PUT method
 */
router.put('/update/:id', routeMiddleware, enforcePermissions, updatedRoute)

export default router