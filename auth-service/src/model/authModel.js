import prisma from '../prismaClient.js'

// Creates a new auth entry
export async function registerUser(username, password) {
    const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        })
        return newUser

}

// Checks for existing username from auth db
export async function loginUser(username) {
    const isUser = await prisma.user.findUnique({
        where: {
            username,  
        }
    })
    return isUser

}

export async function updateUsername(id, data) {
    const updated = await prisma.user.update({
        where: {
            id: id
        }, 
        data: {
            username: data.username

        }

    })
    return updated
    
}

export async function deleteUser(id) {
    await prisma.user.delete({
        where: {
           id : id 
        }
    })

}
