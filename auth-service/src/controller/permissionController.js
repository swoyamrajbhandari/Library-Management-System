import {getRuleList, getRuleInfo, createNewRule, updateRule, removeRule} from '../model/permissionModel.js'
import logger from '../utils/loggers.js'
import axios from 'axios'

const PORT = process.env.PORT || 5000
const PORTuser = process.env.PORTuser || 5001
const PORTlibrary = process.env.PORTlibrary || 5002
const PORTroute = process.env.PORTroute || 5003


export async function broadcastPolicyReload(token) { 
    const services = [
        `http://authservice:${PORT}/auth`,
        `http://userservice:${PORTuser}/user`,
        `http://libraryservice:${PORTlibrary}/library`,
        `http://routeservice:${PORTroute}/route`

    ]   
    
    for (const url of services) {
        try {
            await axios.post(`${url}/casbin/reload`, {}, {
            headers: {  //required because a lot of routes have jwt middleware inbetween
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        logger.info(`Successfully notified ${url} to reload policy.`)

        } catch (err) {
            logger.error(`Failed to notify ${url}: ${err.message}`)

        }
    }
}

export const ruleList = async (req, res) => {
    try {
        const checkRule = await getRuleList()

        if (checkRule.length === 0) {
            logger.warn(`No Casbin rules found in database`)
            res.send(`No Casbin rules found in database`)

        }

        logger.info(`Recieved casbin rule list`)
        res.send(checkRule)

    } catch (err) {
        logger.error(`Failed to fetch Casbin rule list: ${err.message}`)
    }

}

export const ruleInfo = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const checkRuleInfo = await getRuleInfo(id)

        if (!checkRuleInfo) {
            logger.warn(`Casbin rule with ID ${id} not found`)
            res.send(`Casbin rule with ID ${id} not found`)
        }
        
        logger.info(`Recieved casbin rule info for ID: ${id}`)
        res.json(checkRuleInfo)

    } catch (err) {
        logger.error(`Error fetching Casbin rule info for ID ${id}: ${err.message}`)
    }
    
}

export const ruleCreate = async (req, res) => {
    const data = req.body 
    const token = req.headers.authorization?.split(' ')[1]  // for reloadPolicy
    try {
        const newRule = await createNewRule(data)
        await broadcastPolicyReload(token)
    
        logger.info(`New rule created`)
        res.status(200).send(`Created new casbin rule`)

    } catch (err) {
        logger.error(`Failed to create Casbin rule: ${err.message}`)

    }

}

export const changeRule = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body 
    const token = req.headers.authorization?.split(' ')[1]   // for reloadPolicy
    try {
        const newRule = await updateRule(id, data)
        await broadcastPolicyReload(token)   

        logger.info(`Successfully changed a casbin rule`)
        res.status(200).send(`Changed a casbin rule`)

    } catch (err) {
        logger.error(`Failed to update Casbin rule with ID ${id}: ${err.message}`)

    }

}

export const deleteRule = async (req, res) => {
    const id = parseInt(req.params.id) 
    const token = req.headers.authorization?.split(' ')[1]   // for reloadPolicy

    try {
        const deleted = await removeRule(id)
        await broadcastPolicyReload(token)

        logger.info(`Successfully deleted a casbin rule`)
        res.status(200).send(`Deleted a casbin rule`)

    } catch (err) {
        logger.error(`Failed to delete Casbin rule with ID ${id}: ${err.message}`)

    }
    

}