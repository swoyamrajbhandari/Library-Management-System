import {getEnforcer} from './casbin/casbinEnforcer.js'
import logger from './loggers.js'

async function reloadPolicyHandler(req, res) { //helps reload policy from db everytime data is created/updated/deleted
    try {
        const enforcer = await getEnforcer()
        await enforcer.loadPolicy()
        logger.info(`Policy reloaded in this service`)
        res.send(`policy reloaded`)
    } catch (err) {
        logger.error("Failed to reload policy: " + err.message)
        res.status(500).send("Failed")
    }
}

export default reloadPolicyHandler