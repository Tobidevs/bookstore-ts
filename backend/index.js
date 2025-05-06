import express from "express";
import { PORT, mongodbURL } from "./config.js"
import mongoose from "mongoose"
import { Book }from './models/bookModel.js'
import { booksRouter } from './routes/booksRoutes.js'
const app = express()

app.use(express.json());

app.use('/books', booksRouter)


app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})

// Mongoose connection
mongoose.connect(mongodbURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));