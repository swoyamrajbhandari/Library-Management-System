import prisma from '../prismaClient.js'

export async function addRefreshToken(id, hashedRefreshToken) {
    const existing = await prisma.token.findUnique({
        where: {
            userId: id
        }
    })


    if (existing) {
        await prisma.token.update({
            where: {userId: id},
            data: {refreshToken: hashedRefreshToken,
                revoke: false
            }
        })
    } else {
        await prisma.token.create({
            data: {
                userId: id,
                refreshToken: hashedRefreshToken
            }
        
        })
    }
    return 
}

export async function getRefreshToken(id) {
    const newToken = await prisma.token.findUnique({
        where: {
            userId: id
        }
    })

    return newToken
}

export async function refreshTokenStatus(id) {
    const deletedState = await prisma.token.delete({
        where: {
            userId: id
        }
    })
    return 
}