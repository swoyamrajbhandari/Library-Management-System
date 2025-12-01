import prisma from '../../shared-middleware/prismaClient.js'

export async function getRuleList() {
    const list = await prisma.casbinRule.findMany({
        select: {
            id: true,
            ptype: true,
            v0: true,
            v1: true,
            v2: true,
            v3: true,
            v4: true,

        }
    })
    return (list)

}

export async function getRuleInfo(id) {
    const info = await prisma.casbinRule.findUnique({
        where: {
            id
        }
    })
    return info
}

export async function createNewRule(data) {
    const newRule = await prisma.casbinRule.create({
        data: {
            ptype: data.ptype,
            v0: data.v0,
            v1: data.v1,
            v2: data.v2,
            v3: data.v3,
            v4: data.v4
        }
    })
    return newRule
}

export async function updateRule(id, data) {
    const changedRule = await prisma.casbinRule.update({
        where: {
            id

        }, 
        data: {
            ptype: data.ptype,
            v0: data.subj,
            v1: data.obj,
            v2: data.act,
            v3: data.access,
            v4: data.eft
        }
    })
    return changedRule
}

export async function removeRule(id) {
    await prisma.casbinRule.delete({
        where: {
            id
        }
       
    })
    return 
}