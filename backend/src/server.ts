import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config

// db
import connectDB from './db/connect'

// routers

// middlewares
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
    // throw new Error()
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const dbURL = 'mongodb+srv://sandrex:VfoIzaQVfoETZ0tf@nodeexpressprojects.nqofbn1.mongodb.net/POC-MERN?retryWrites=true&w=majority'

const start = async () => {
    try {
        await connectDB(dbURL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()