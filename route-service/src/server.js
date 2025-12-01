import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import routes from './routes/routes.js'
import extractRoutes from '../shared-middleware/extractRoutes.js'
import axios from 'axios'
import logger from '../loggers.js'

const PORT = process.env.PORT || 5003

const app = express()

//Middleware
app.use(express.json()) //helps parse body: json value that is sent by client
app.use(cors({origin: '*'}))

const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'Router service testing',
            version: '1.0.0'
        },
        servers: [
            {
               url: 'http://localhost:5003'
            }, 
    
        ]
    },
    apis: ['./src/routes/*.js']  //Swagger apis paths are relative to the current working directory, which is usually where you run node (your terminal).
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/route', routes )

async function routeSync() {
    const registerRoutes = await extractRoutes(app, '/route')
    //logger.info(registerRoutes)

    logger.info("Sending axios request...")
    const res = await axios.post("http://routeservice:5003/route/sync", {
        service:"routeservice",
        registerRoutes

    })


}

async function startServer(){
    try {

        app.listen(5003, () => {
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

