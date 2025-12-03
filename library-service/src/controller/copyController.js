import {copyList, copyInfo, copyCreate, copyUpdate, deleteCopy} from '../model/copyModel.js'
import loggers from '../utils/loggers.js'

// Gives all books and their copies as a list
export const copyListController = async (req, res) => {
    try {
        const status = await copyList()
        if (status.length === 0) {
            loggers.warn(`No book copies found in database`)
            res.send(`No book copies found in database`)

        }
        loggers.info('Displayed list of Copies of all books')
        res.json({status})

    } catch (err) {
        loggers.error(`Failed to fetch Book copies list: ${err.message}`)

    }

}

// Gives given copy detail
export const copyController = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const status = await copyInfo(id)
        if (!status) {
            loggers.warn(`Book copy with ID ${id} not found`)
            res.send(`Book copy with ID ${id} not found`)
        }

        loggers.info(`Displayed info of copy id: ${status.id} for book: ${status.book.name}`)
        res.json({status})

    } catch (err) {
        loggers.error(`Error fetching book copy info for ID ${id}: ${err.message}`)

    }

}

// Cretes a copy of given book
export const copyCreateController = async (req, res) => {
    const bookId = parseInt(req.params.id) 
    const data = req.body

    try {
        const bookCopy = await copyCreate(bookId, data)

        loggers.info(`A new copy of book: ${bookCopy.name} is created`)
        res.status(201).send("New copy created")

    } catch (err) {
        loggers.error(`Failed to create book copy: ${err.message}`)

    }

}

// updates status of a copy
export const updateCopyController = async (req, res) => {
    const id = parseInt(req.params.id)
    const {status} = req.body

    let copy
    try {
        copy = await copyUpdate(id, status)
        loggers.info(`The status of copy: ${copy.id} of the book: ${copy.book.name} was updated`)
        res.status(201).send('Book status updated')

    } catch (err) {

        loggers.error(`Failed to update book copy with ID ${id}: ${err.message}`)

        return res.status(501).send(`Failed to update book copy with ID ${id}: ${err.message}`)
    }



}

// Deletes a copy of a book
export const deleteCopyController = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const deleted = await deleteCopy(id)
        loggers.info(`Copy: ${id} of book: ${deleted.book.name} was deleted`)
        res.status(201).send('Book copy deleted')

    } catch(err) {
        loggers.warn(`Copy id ${id} not found`)
        return res.status(404).send('Copy not found')
    }
    

}

