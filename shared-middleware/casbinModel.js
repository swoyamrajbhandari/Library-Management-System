import {prisma} from './casbin/casbinEnforcer.js'

export async function getResource(method, route){
    
    const routeData = await prisma.aPIRoutes.findFirst({
        where: {
            method,
            route
        }
    })
    
    return { resource: routeData.resource, action: routeData.action }

}