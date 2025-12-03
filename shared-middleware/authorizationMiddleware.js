import {getEnforcer} from './casbin/casbinEnforcer.js'
import axios from 'axios'
import logger from './loggers.js'

async function enforcePermissions(req, res, next) {
    const token = req.headers['authorization']

    // const token = req.headers['authorization']
    const {id: owner, role} = req.user
    const request = req.method.toUpperCase()
    const obj = req.baseUrl + (req.route?.path || req.path)
    // extract the route id (or null)
    const targetId = req.params?.id ? parseInt(req.params.id) : '*'

    const response = await axios.post('http://routeservice:5003/route/resource', {   //Axios returns an object shaped like this:

                                                                                    // {
                                                                                    // data: { resource: "...", action: "..." },
                                                                                    // status: 200,
                                                                                    // headers: {...}
                                                                                    // }
        request,
        obj
    })

    const {resource, action} = response.data
    const enforcer = await getEnforcer()

    const allowed = await enforcer.enforce(role, resource, action, targetId, owner)
    logger.info(`Authorization given to user: ${owner} for ${action} on ${resource}`)

    if (!allowed) {
        logger.info(`Authorization not given to user: ${owner} for ${action} on ${resource}`)
        return res.status(402).send(`Authorization not given to user: ${owner} for ${action} on ${resource} `)
    }
    
    next()
    

} 

export {enforcePermissions}