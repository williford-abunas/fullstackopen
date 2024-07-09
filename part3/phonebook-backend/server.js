import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { personsRouter } from './routes/persons.js'

const app = express()
const PORT = process.env.PORT || 3001

// MOrGAN CONFIG
morgan.token('body', (req, res) => JSON.stringify(req.body))

// MIDDLE WARE
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// ROUTES
app.use('/api', personsRouter)

// ERROR HANDLER MIDDLEWARE
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // Cast error (malformed ID)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  // Validation error
  if (error.name === 'ValidationError') {
    const validationErrors = Object.values(error.errors).map(
      (val) => val.message
    )
    return response.status(400).json({ error: validationErrors })
  }

  // MongoError (duplicate key, etc.)
  if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
