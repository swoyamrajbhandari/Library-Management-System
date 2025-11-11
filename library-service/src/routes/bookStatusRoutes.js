import {Router} from 'express'
import {copyListController, copyController, copyCreateController, updateCopyController, deleteCopyController} from '../controller/copyController.js'

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

/**
 * @swagger
 * /library/copies:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.get('/copies', copyListController)

/**
 * @swagger
 * /library/copies/{id}:
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
router.get('/copies/:id', copyController)

/**
 * @swagger
 *  components:
 *      schemas:
 *          bookcopyinfo:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *          
 */

/**
 * @swagger
 * /library/{id}/copy:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      security:
 *          - bearerAuth: [] 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/bookcopyinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/:id/copy', copyCreateController)

/**
 * @swagger
 * /library/copies/{id}:
 *  put:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      security:
 *          - bearerAuth: [] 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/bookcopyinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.put('/copies/:id', updateCopyController)

/**
 * @swagger
 * /library/copies/{id}:
 *  delete:
 *      summary: Check if DELETE method is working
 *      description: This API is used to check if DELETE method is working or not
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
router.delete('/copies/:id', deleteCopyController)


export default router
