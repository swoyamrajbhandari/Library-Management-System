import {routesList, routeInfo, getResource, createRoute, updateRoute} from '../model/apiRouteModel.js'
import prisma from '../prismaClient.js'

export const getRoutes = async (req, res) => {
    try {
        const routeList = await routesList()
        logger.info(`Routes list`)
        return res.json({routeList})

    } catch (err) {
        logger.error(`Failed to get route list: ${err.message}`)


    }
    


}

export const getRoute = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const routeData = await routeInfo(id)
        return res.json({routeData})

    } catch (err) {
        logger.error(`Failed to get route with ID ${id}: ${err.message}`)
        
    }
    

}

export const checkResource = async (req, res) => {
    const {request, obj} = req.body
    try {
        const {resource, action} = await getResource(request, obj)
        logger.info(`Routes resource`)
        return res.json({resource, action})

    } catch (err) {
        logger.error(`Failed to get resource data: ${err.message}`)
        
    }


}

export const syncRoute = async (req, res) => {
    const data = req.body.registerRoutes
    // console.log(data)

    if (!data || !Array.isArray(data)){
        return res.status(400).send(`registerRoutes must be an array`)
    }

    const results = []

    for (const route of data){
        const existing = await prisma.aPIRoutes.findFirst({
            where: {
                method: route.method,
                route: route.path
            }
        })

        if (!existing) {
            const created = await createRoute(route)
            results.push(created)

        }
    }

    return res.json(results)
    

}

export const updatedRoute = async (req, res) => {
    
    const id = parseInt(req.params.id)
    try {
        const {resource, action} = req.body
        const routeList = await updateRoute(id, resource, action)
        res.status(200).send(`Updated route data`)

    } catch (err) {
        logger.error(`Failed to route date with ID ${id}: ${err.message}`)
        
    }
    

}