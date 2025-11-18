import express from 'express'
import authRoutes from './routes/authRoutes.js'
import refreshTokenRoutes from './routes/refreshTokenRoute.js'
import seed from './seed.js'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import logger from '../loggers.js' 

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

async function startServer(){
    try {
        logger.info('Running seed...')
        await seed()
        logger.info('Seed complete')

        app.listen(5000, () => logger.info(`Server is running on PORT${PORT}`))
    
    } catch(err) {
        logger.error(err.message)
        process.exit(1)
    }



}

startServer()
