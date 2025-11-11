import {bookList, bookFind, createBook, updateBook, deleteBook} from '../model/libraryModel.js'
import loggers from '../../loggers.js'

export const bookListController = async (req, res) => {
    const books = await bookList()
    loggers.info('Displayed the book list')
    res.json({books})

}

export const bookController = async (req, res) => {
    const bookId = parseInt(req.params.id)
    const book = await bookFind(bookId)

    if(!book) {
        loggers.error(`No book found with id: ${bookId}`)
        return res.status(404).send('No book found')
    }
    
    loggers.info(`The book with id: ${bookId} is ${book.name}`)
    res.json({book})

}

export const createBookController = async (req, res) => {
    if (req.user.role !== 'admin') {
        loggers.warn(`Permission denied: User ${req.user.id} tried to create a book`)
        return res.status(501).send('Access denied')
    }

    const data = req.body
    const newBook = await createBook(data)

    loggers.info(`Book: ${data.name} created`)
    res.status(201).send('Book added')


}

export const updateBookController = async (req, res) => {
    const id = parseInt(req.params.id)
    const newData = req.body
    if (req.user.role !== 'admin') { 
        loggers.warn(`Permission denied: User ${req.user.id} tried to update a books data`)
        return res.status(501).send('Access denied')
    }
    
    const editBook = await updateBook(id, newData)
    loggers.info(`Updated book with id: ${id}`)
    
    res.status(201).send('Updated entry')

}

export const deleteBookController = async (req, res) => {
    const id = parseInt(req.params.id)
    if (req.user.role !== 'admin'){ 
        loggers.warn(`Permission denied: User ${req.user.id} tried to delete a book`)
        return res.status(501).send('Access denied')
    }

    await deleteBook(id)
    
    loggers.info(`Deleted book with id: ${id}`)
    res.status(202).send('Deleted book')

}