import {routesList, routeInfo, getResource, createRoute, updateRoute} from '../model/apiRouteModel.js'
import prisma from '../prismaClient.js'

export const getRoutes = async (req, res) => {
    const routeList = await routesList()
    console.log(`Routes list`)
    return res.json({routeList})


}

export const getRoute = async (req, res) => {
    const id = parseInt(req.params.id)
    const routeData = await routeInfo(id)
    return res.json({routeData})
    

}

export const checkResource = async (req, res) => {
    const {request, obj} = req.body
    const {resource, action} = await getResource(request, obj)
    console.log(`Routes resource`)
    return res.json({resource, action})


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
    // console.log(results)

    return res.json(results)
    

}

export const updatedRoute = async (req, res) => {
    const id = parseInt(req.params.id)
    const {resource, action} = req.body
    const routeList = await updateRoute(id, resource, action)
    res.status(200).send(`Updated route data`)
    

}