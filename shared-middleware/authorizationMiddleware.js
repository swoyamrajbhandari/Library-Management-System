import {getEnforcer} from './casbin/casbinEnforcer.js'

const actions = {
        GET:"read",
        POST:"write",
        PUT:"update",
        DELETE:"delete"
    }

const routeToResource = {
    "/auth/role/:id":"auth.role",
    "/auth/logout": "auth.logout",
    "/user/list": "user.list",
    "/user/info/:id": "user.info",
    "/user/update/:id": "user.update",
    "/user/delete/:id": "user.delete",
    "/library/book": "library.list",
    "/library/book/:id": "library.info",
    "/library/book/create": "library.create",
    "/library/book/update/:id": "library.update",
    "/library/book/delete/:id": "library.delete",
    "/library/copies": "library.copy.list",
    "/library/copies/:id": "library.copy.info",
    "/library/:id/copy": "library.copy.create",
    "/library/copies/update/:id": "library.copy.update",
    "/library/copies/delete/:id": "library.copy.delete"
}

async function enforcePermissions(req, res, next) {

    // const token = req.headers['authorization']
    const {id: owner, role} = req.user
    const request = req.method.toUpperCase()
    const obj = req.baseUrl + (req.route?.path || req.path)
    // extract the route id (or null)
    const targetId = req.params?.id ? parseInt(req.params.id) : '*'

    const enforcer = await getEnforcer()
    // console.log(enforcer)
    // console.log({role, obj: routeToResource[obj] , action: actions[request], targetId, owner})

    const allowed = await enforcer.enforce(role, routeToResource[obj], actions[request], targetId, owner)

    // console.log('Allowed?', allowed)
    if (!allowed) {
        return res.status(402).send(`Authorization not given to user: ${owner} for ${actions[request]} on ${ routeToResource[obj]} `)
    }
    
    next()
    

} 

export {actions, routeToResource, enforcePermissions}