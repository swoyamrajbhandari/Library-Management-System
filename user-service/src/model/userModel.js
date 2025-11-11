import prisma from '../prismaClient.js'

// gets all the users in the user db
export async function userList() {
    const userList = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    })

    return userList

}

//Finds given id user from user db
export async function findUser(id) {
    const foundUser = prisma.user.findUnique({
        where: {
            id:id
        }
    })
    return foundUser
}

//Creates a user in user db after authentication (authId = req.user.id)
export async function newUserCreate(authId, info) {
    const userCreated = await prisma.user.create({
        data :{
            id: authId,  //id from JWT authentication, safer than from body where people can maliciously create profiles for others
                              // also only added id in create because it accepts id directly on registration, 
                              //otherwise, id is autoincremented on create and usually should not be added in create
            username: info.username,
            email: info.email,
            profile: info.profile

        }
    })
    return userCreated
}

// Changes the data of given user id in the user db
export async function updateUser(target, data) {
    const {username, email, profile} = data
    const updated = await prisma.user.update({
            where: {
                id: target,

            },
            data: {
                username,
                email,
                profile

            }
        })
        return updated
}

// Deletes given id user from user db
export async function deleteUser(userId) {
    await prisma.user.delete({
        where: {
            id: userId
        }

    })
}