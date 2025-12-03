import express from 'express'
import cors from 'cors'
import userInfoRoutes from './routes/userInfoRoutes.js'
import userMiddleware from './middleware/userMiddleware.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import logger from './utils/loggers.js'
import axios from 'axios'
import extractRoutes from '../shared-middleware/extractRoutes.js'
const PORT = process.env.PORT || 5001

const app = express()

//middleware
app.use(express.json())
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
                url: 'http://localhost:5001'
            }
        ]
    },
    apis: ['./src/routes/*.js']  //Swagger apis paths are relative to the current working directory, which is usually where you run node (your terminal).
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/user', userMiddleware,  userInfoRoutes)

async function routeSync() {
    const registerRoutes = await extractRoutes(app, '/user')

    logger.info("Sending axios request...")
    const res = await axios.post("http://routeservice:5003/route/sync", {
        service:"userservice",
        registerRoutes

    })


}

try {
        
    app.listen(5001, () => {
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