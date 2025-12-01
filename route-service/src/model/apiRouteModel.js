import prisma from '../prismaClient.js'

// get resouce and not route (for axios from shared-middlewate)
export async function getResource(method, route){
    console.log(`Getting resource for method: ${method}, route: ${route}`);
    const routeData = await prisma.aPIRoutes.findFirst({
        where: {
            method,
            route
        }
    })
    console.log(`Found route data: ${JSON.stringify(routeData)}`);

    if (!routeData){
        return {resource: null, action: null}
    }
    
    return { resource: routeData.resource, action: routeData.action }

}

export async function routesList(){
    const getRoutes = await prisma.aPIRoutes.findMany({
        select : {
            id: true,
            method: true,
            route: true,
            resource: true,
            action: true
        }

    })
    return getRoutes

}

export async function routeInfo(id){
    const getRoute = await prisma.aPIRoutes.findUnique({
        where : {
            id
        }

    })
    return getRoute

    
}

// axios on startup to add all new routes
export async function createRoute(routeData){  //here routeData is a single route from the route list sent from extractRoute
    
    const addRoute = await prisma.aPIRoutes.create({
        data : {
            method: routeData.method,
            route: routeData.path,
            resource: null,
            action: null
        }

    })
    return addRoute
    
    
}

export async function updateRoute(id, resource, action){
    const updated = await prisma.aPIRoutes.update({
        where: {
            id
        },
        data: {
            resource,
            action
        }

    })
    return updated
    
}



