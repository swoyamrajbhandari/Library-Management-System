import {copyList, copyInfo, copyCreate, copyUpdate, deleteCopy} from '../model/copyModel.js'
import loggers from '../../loggers.js'

// Gives all books and their copies as a list
export const copyListController = async (req, res) => {
    const status = await copyList()
    loggers.info('Displayed list of Copies of all books')
    res.json({status})

}

// Gives given copy detail
export const copyController = async (req, res) => {
    const id = parseInt(req.params.id)
    const status = await copyInfo(id)

    loggers.info(`Displayed status of copy id: ${status.id} for book: ${status.book.name}`)
    res.json({status})


}

// Cretes a copy of given book
export const copyCreateController = async (req, res) => {
    const bookId = parseInt(req.params.id) 
    const data = req.body
    // if (req.user.role !== 'admin') {
    //     loggers.warn(`Permission denied: User ${req.user.id} tried to create a copy of book with id: ${bookId}`)
    //     return res.status(501).send('Access denied')
    // }

    const bookCopy = await copyCreate(bookId, data)

    loggers.info(`A new copy of book: ${bookCopy.name} is created`)
    res.status(201).send("New copy created")

}

// updates status of a copy
export const updateCopyController = async (req, res) => {
    const id = parseInt(req.params.id)
    const {status} = req.body
    // if (req.user.role !== 'admin') {
    //     loggers.warn(`Permission denied: User ${req.user.id} tried to update book with id: ${id}`)
    //     return res.status(501).send('Access denied')
    // }

    let copy
    try {
        copy = await copyUpdate(id, status)
        console.log(copy)
        loggers.info(`Copy id: ${id} of book: ${copy.book.name} was updated`)
    } catch (err) {
        loggers.error(err.message)
        loggers.warn(`Copy id: ${id} of book: ${copy.book.name} not found`)
        return res.status(501).send('No such copy entry')
    }

    loggers.info(`The status of copy: ${copy.id} of the book: ${copy.book.name} was updated`)
    return res.status(201).send('Book status updated')

}

// Deletes a copy of a book
export const deleteCopyController = async (req, res) => {
    const id = parseInt(req.params.id)
    // if (req.user.role !== 'admin') {
    //     loggers.warn(`Permission denied: User ${req.user.id} tried to delete book with id: ${id}`)
    //     return res.status(501).send('Access denied')
    // }

    try {
        const deleted = await deleteCopy(id)
        loggers.info(`Copy: ${id} of book: ${deleted.book.name} was deleted`)
        res.status(201).send('Book copy deleted')

    } catch(err) {
        loggers.warn(`Copy id ${id} not found`)
        return res.status(404).send('Copy not found')
    }
    

}

