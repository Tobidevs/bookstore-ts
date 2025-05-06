import express from "express";
import { PORT, mongodbURL } from "./config.js"
import mongoose from "mongoose"
import cors from 'cors'
import { booksRouter } from './routes/booksRoutes.js'
const app = express()

app.use(express.json());

// Middleware for handling CORS policy 
app.use(cors())

// Route all /books requests to booksRouter
app.use('/books', booksRouter)


app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})

// Mongoose connection
mongoose.connect(mongodbURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));