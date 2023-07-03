import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config

// db

// routers

// middlewares
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
    // throw new Error()
})

