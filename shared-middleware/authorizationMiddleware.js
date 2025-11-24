import {getEnforcer} from './casbin/casbinEnforcer.js'
import {getResource} from './casbinModel.js'

async function enforcePermissions(req, res, next) {

    // const token = req.headers['authorization']
    const {id: owner, role} = req.user
    const request = req.method.toUpperCase()
    const obj = req.baseUrl + (req.route?.path || req.path)
    // extract the route id (or null)
    const targetId = req.params?.id ? parseInt(req.params.id) : '*'

    const {resource, action} = await getResource(request, obj)

    const enforcer = await getEnforcer()

    const allowed = await enforcer.enforce(role, resource, action, targetId, owner)
    console.log(allowed)

    // console.log('Allowed?', allowed)
    if (!allowed) {
        return res.status(402).send(`Authorization not given to user: ${owner} for ${action} on ${resource} `)
    }
    
    next()
    

} 

export {enforcePermissions}