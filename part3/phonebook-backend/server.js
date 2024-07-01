import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { personsRouter } from './routes/persons.js'

const app = express()
const PORT = process.env.PORT || 3001

// MOrGAN CONFIG
morgan.token('body', (req, res) => JSON.stringify(req.body))

// MIDDLE WARE
app.use(express.json())
app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// ROUTES
app.use('/api', personsRouter)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
