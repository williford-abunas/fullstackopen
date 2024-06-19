import express from 'express'
import data from './data.js'

const app = express()
const PORT = 3001

// MIDDLE WARE
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(data)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${data.length} people</p><p>${date}</p>`)
})

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
