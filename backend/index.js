import express from "express";
import { PORT, mongodbURL } from "./config.js"
import mongoose from "mongoose"
const app = express()

app.get('/', (req, res, next) => {

});

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})

mongoose.connect(mongodbURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));