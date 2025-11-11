import prisma from '../prismaClient.js'

export async function bookList() {
    const books = await prisma.book.findMany({
        select: {
            name: true
        }
    })
    return books
}

export async function bookFind(bookId) {
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
        
    })
    return book
}

export async function createBook(data) {
    const created = await prisma.book.create({
        data: {
            name: data.name,
            author: data.author,
            isbn: data.isbn,
            edition: data.edition,
            DOR: data.DOR,
            copies: {create: {status: 'available'}} // automatically create one copy

        }
        
    })
    return created
}

export async function updateBook(id, newData) {
    const updatedBook = await prisma.book.update({
        where: {
            id: id
        }, 
        data: {
            name: newData.name,
            author: newData.author,
            isbn: newData.isbn,
            edition: newData.edition,
            DOR: newData.DOR
        }

    })
    return updatedBook
}

export async function deleteBook(id) {
    const deleted = prisma.book.delete({
        where: {
            id: id
        }
    })
    return deleted
}