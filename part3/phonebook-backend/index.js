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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  const person = data.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${data.length} people</p><p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  const newArray = data.filter((person) => person.id !== id)
  console.log(newArray)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name and number are required' })
  }
  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  }
  data.push(newPerson)
  res
    .status(201)
    .json(`new person: ${newPerson.name} number ${newPerson.number} is created`)
})

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
