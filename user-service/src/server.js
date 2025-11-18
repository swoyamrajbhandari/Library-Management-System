import express from 'express'
import cors from 'cors'
import userInfoRoutes from './routes/userInfoRoutes.js'
import userMiddleware from './middleware/userMiddleware.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
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

app.listen(5001, () => console.log(`Server is running on PORT${PORT}`))