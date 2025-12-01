import {Router} from 'express'
import {generateAndRefreshToken, revokeRefreshToken} from '../controller/refreshTokenController.js'
import authenticizeJWT from '../middleware/authMiddleware.js'
import {enforcePermissions} from '../../shared-middleware/authorizationMiddleware.js'  // in container(auth-service), it's inside /app/shared-middleware/..
                                                                                                                //so we go from: /app/src/

const router = Router()


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
 *  components:
 *      schemas:
 *          tokeninfo:
 *             type: object
 *             properties:
 *                 refreshToken:
 *                     type: string
 *          tokenstatus:
 *              type: object
 *              properties:
 *                 refreshToken:
 *                     type: string
 * 
 */


/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *      summary: Check if POST method is working
 *      description: This API is used to check if POST method is working or not
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/tokeninfo'
 *      responses:
 *             200:
 *                 description: To test POST method
 */
router.post('/refresh-token', generateAndRefreshToken)

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout user
 *     description: Revokes the user's refresh token and logs them out.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenstatus'
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.delete('/logout', authenticizeJWT, enforcePermissions, revokeRefreshToken)


export default router