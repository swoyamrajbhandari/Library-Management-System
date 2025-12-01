import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import bookStatusRoutes from './routes/bookStatusRoutes.js'
import libraryMiddleware from './middleware/libraryMiddleware.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import axios from 'axios'
import extractRoutes from '../shared-middleware/extractRoutes.js'
import logger from '../loggers.js'

const PORT = process.env.PORT || 5002

const app = express()

//middleware
app.use(express.json())
app.use(cors({origin: '*'}))

const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'Library service testing',
            version: '1.0.0'
        },
        servers: [
            {
               url: 'http://localhost:5002'
            }, 
    
        ]
    },
    apis: ['./src/routes/*.js']  //Swagger apis paths are relative to the current working directory, which is usually where you run node (your terminal).
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/library', libraryMiddleware, bookRoutes)
app.use('/library', libraryMiddleware, bookStatusRoutes)

async function routeSync() {
    const registerRoutes = await extractRoutes(app, '/library')
    //logger.info(registerRoutes)

    logger.info("Sending axios request...")
    const res = await axios.post("http://routeservice:5003/route/sync", {
        service:"libraryservice",
        registerRoutes

    })


}

try {
        
    app.listen(5002, () => {
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