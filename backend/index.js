import express from "express";
import { PORT, mongodbURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from './models/bookModel.js'
const app = express()

app.use(express.json());

// Create Book in DB
app.post('/books', async(req, res, next) => {
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
app.get('/books', async (req, res, next) => {
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
app.get('/books/:id', getBook, async (req, res, next) => {
    res.json(res.book)
})

// Update book in DB
app.patch('/books/:id', getBook, async (req, res, next) => {
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
app.delete('/books/:id', getBook, async (req, res, next) => {
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

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})

// Mongoose connection
mongoose.connect(mongodbURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));