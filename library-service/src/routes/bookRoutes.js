import {Router} from 'express'
import {bookListController, bookController, createBookController, updateBookController, deleteBookController} from '../controller/libraryController.js'

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
 * /library/book:
 *  get:
 *      summary: Check if GET method is working
 *      description: Get all API testing
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *             200:
 *                 description: To test Get method
 */
router.get('/book', bookListController)

/**
 * @swagger
 * /library/book/{id}:
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
router.get('/book/:id', bookController)

/**
 * @swagger
 *  components:
 *      schemas:
 *          bookinfo:
 *              type: object
 *              properties:
 *                  name: 
 *                      type: string
 *                  author: 
 *                      type: string
 *                  isbn:
 *                      type: string
 *                  edition:
 *                      type: number
 *                  DOR:
 *                      type: string
 *                      format: date
 *          
 */


/**
 * @swagger
 * /library/book:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      security:
 *          - bearerAuth: [] 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/bookinfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/book', createBookController)

/**
 * @swagger
 * /library/book/{id}:
 *  put:
 *      summary: Check if PUT method is working
 *      description: This API is used to check if PUT method is working or not
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
 *                      $ref: '#/components/schemas/bookinfo'
 *      responses:
 *             200:
 *                 description: To test PUT method
 */
router.put('/book/:id', updateBookController)

/**
 * @swagger
 * /library/book/{id}:
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
router.delete('/book/:id', deleteBookController)

export default router