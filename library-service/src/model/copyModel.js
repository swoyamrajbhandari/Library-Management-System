import prisma from '../prismaClient.js'

export async function copyList() {
    const list = await prisma.book.findMany({
        select: {
            id: true,
            name: true,
            copies: true
        }
    })
    return list
}

export async function copyInfo(id) {
    const aboutCopy =  prisma.bookCopy.findUnique({
        where: {
            id: id
        }, 
        include : {
            book: {
                select: {name:true}
            }
            
        },
        
    })
    return aboutCopy

}

export async function copyCreate(bookId, data) {
    const created = await prisma.book.update({
        where: {
            id: bookId
        }, 
        data: {
            copies: {create: data}
        }
    })
    return created

}

export async function copyUpdate(id, status) {
    const changed = await prisma.bookCopy.update({
            where:{
                id: id
            },
            data: {
                status: status
            }, 
            include: {
                book: {
                    select: {
                        name:true
                    }
                }
            }
            
        })
        return changed
}

export async function deleteCopy(id) {
    const deleted = await prisma.bookCopy.delete({
        where: {
            id: id
        }, 
        include: {
            book: {select: {name: true}}
        }
    })
    return deleted

}