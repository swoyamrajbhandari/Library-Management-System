import express from 'express'
import authRoutes from './routes/authRoutes.js'
import refreshTokenRoutes from './routes/refreshTokenRoute.js'
import permissionRoutes from './routes/permissionRoute.js'
import {main, seedCasbinRules, seedCasbinFromCSV} from './seed.js'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import logger from './utils/loggers.js'
import axios from 'axios'
import extractRoutes from '../shared-middleware/extractRoutes.js'
import authenticizeJWT from './middleware/authMiddleware.js'
import { enforcePermissions } from '../shared-middleware/authorizationMiddleware.js'

const PORT = process.env.PORT || 5000

const app = express()

//Middleware
app.use(express.json()) //helps parse body: json value that is sent by client
app.use(cors({origin: '*'}))

const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'Authentication service testing',
            version: '1.0.0'
        },
        servers: [
            {
               url: 'http://localhost:5000'
            }, 
    
        ]
    },
    apis: ['./src/routes/*.js']  //Swagger apis paths are relative to the current working directory, which is usually where you run node (your terminal).
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use('/auth', authRoutes)
app.use('/auth', refreshTokenRoutes)
app.use('/auth', authenticizeJWT, enforcePermissions, permissionRoutes)

async function routeSync() {
    const registerRoutes = await extractRoutes(app, '/auth')
    // logger.info(registerRoutes)

    logger.info("Sending axios request...")
    const res = await axios.post("http://routeservice:5003/route/sync", {
        service:"authservice",
        registerRoutes

    })


}

async function startServer(){
    try {
        logger.info('Running seed...')
        await main()
        await seedCasbinRules()
        await seedCasbinFromCSV()
        logger.info('Seed complete')

        app.listen(5000, () => {
            logger.info(`Server is running on PORT${PORT}`)
        })

        try {
            await routeSync()
            logger.info("Route sync complete")
        } catch (err) {
            logger.error(err.message)
        }
    
    } catch(err) {
        logger.error(err.message)
        process.exit(1)
    }



}

startServer()
