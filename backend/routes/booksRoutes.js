import express from 'express'
export const booksRouter = express.Router()
import { Book } from '../models/bookModel.js'

// Create Book in DB
booksRouter.post('/', async(req, res, next) => {
    try {
        // Check all fields
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: 'Send all required fields!' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        // Create book
        const book = await Book.create(newBook)
        return res.status(201).json(book)
    } catch (err) {
        res.status(500).send({ message: err.message})
    }
})

// Get all books from DB
booksRouter.get('/', async (req, res, next) => {
    try {
        const books = await Book.find({})
        res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        res.status(500).send({ message: err.message})
    }
});

// Get one book from DB
booksRouter.get('/:id', getBook, async (req, res, next) => {
    res.json(res.book)
})

// Update book in DB
booksRouter.patch('/:id', getBook, async (req, res, next) => {
    if (req.body.title != null) {
        res.book.title = req.body.title
    }
    if (req.body.author != null) {
        res.book.author = req.body.author
    }
    if (req.body.publishYear != null) {
        res.book.publishYear = req.body.publishYear
    }
    try {
        const updatedBook = await res.book.save()
        res.status(200).json(updatedBook)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete book from DB
booksRouter.delete('/:id', getBook, async (req, res, next) => {
    try {
        await res.book.deleteOne()
        res.json({ message: 'Deleted Book' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get book by Id
async function getBook(req, res, next) {
    let book
    try {
        book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.book = book
    next()
}

