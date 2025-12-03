import prisma from '../prismaClient.js'

// get resouce and not route (for axios from shared-middlewate)
export async function getResource(method, route) {
    console.log(`Getting resource for method: ${method}, route: ${route}`);
    
    const routes = await prisma.aPIRoutes.findMany({  //find all matching method entries into a list
        where: {
            method
        }
    });

    const incomingRouteParts = route.split('/').filter(p => p) //the route passed as parameter split into components

    for (const storedRoute of routes) { //each matching method entries
        const storedRouteParts = storedRoute.route.split('/').filter(p => p) //split path into components
                                                                             //filter(p => p) removes all falsy values from the array. 
                                                                             // In JavaScript, '' (empty string) is falsy.

        if (incomingRouteParts.length !== storedRouteParts.length) { //matches length of passed route with api_route entries
            continue
        }

        let match = true;
        for (let i = 0; i < storedRouteParts.length; i++) {
            if (storedRouteParts[i].startsWith(':')) {
                continue   //skips current iteration
            }
            if (storedRouteParts[i] !== incomingRouteParts[i]) {
                match = false;
                break
            }
        }

        if (match) {
            console.log(`Found route data: ${JSON.stringify(storedRoute)}`)
            return { resource: storedRoute.resource, action: storedRoute.action }
        }
    }

    console.log(`Found no matching route for: ${route}`)
    return { resource: null, action: null }
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



