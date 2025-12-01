import {getRuleList, getRuleInfo, createNewRule, updateRule, removeRule} from '../model/permissionModel.js'

export const ruleList = async (req, res) => {
    const checkRule = await getRuleList()
    console.log(`Recieved casbin rule list`)
    res.send(checkRule)

}

export const ruleInfo = async (req, res) => {
    const id = parseInt(req.params.id)
    const checkRuleInfo = await getRuleInfo(id)
    console.log(`Recieved casbin rule info`)
    res.json(checkRuleInfo)
}

export const ruleCreate = async (req, res) => {
    const data = req.body 
    const newRule = await createNewRule(data)
    res.status(200).send(`Created new casbin rule`)

}

export const changeRule = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body 
    const newRule = await updateRule(id, data)
    res.status(200).send(`Changed a casbin rule`)

}

export const deleteRule = async (req, res) => {
    const id = parseInt(req.params.id) 
    await removeRule(id)
    res.status(200).send(`Deleted a casbin rule`)

}