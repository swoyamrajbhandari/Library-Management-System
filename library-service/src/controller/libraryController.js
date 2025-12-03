import {bookList, bookFind, createBook, updateBook, deleteBook} from '../model/libraryModel.js'
import loggers from '../utils/loggers.js'

export const bookListController = async (req, res) => {
    try {
        const books = await bookList()

        if (books.length === 0) {
            loggers.warn(`No books found in database`)
            res.send(`No books found in database`)

        }

        loggers.info('Displayed the book list')
        res.json({books})

    } catch (err) {
        loggers.error(`Failed to fetch book list: ${err.message}`)

    }

}

export const bookController = async (req, res) => {
    const bookId = parseInt(req.params.id)

    try {
        const book = await bookFind(bookId)

        if(!book) {
            loggers.error(`No book found with id: ${bookId}`)
            return res.status(404).send(`No book found with id: ${bookId}`)
        }
        
        loggers.info(`The book with id: ${bookId} is ${book.name}`)
        res.json({book})

    } catch (err) {
        loggers.error(`Error fetching book info for ID ${id}: ${err.message}`);


    }

}

export const createBookController = async (req, res) => {

    const data = req.body
    try {
        const newBook = await createBook(data)

        loggers.info(`Book: ${data.name} created`)
        res.status(201).send('Book added')


    } catch (err) {
        loggers.error(`Failed to create book: ${err.message}`)


    }

}

export const updateBookController = async (req, res) => {
    const id = parseInt(req.params.id)
    const newData = req.body

    try {
        const editBook = await updateBook(id, newData)
        loggers.info(`Updated book with id: ${id}`)
        
        res.status(201).send('Updated entry')

    } catch (err) {
        loggers.error(`Failed to update book info with ID ${id}: ${err.message}`);

    }

}

export const deleteBookController = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await deleteBook(id)
    
        loggers.info(`Deleted book with id: ${id}`)
        res.status(202).send('Deleted book')

    } catch (err) {
        loggers.error(`Failed to delete book with ID ${id}: ${err.message}`)

    }

    

}