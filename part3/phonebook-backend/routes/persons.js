import express from 'express'
import personsData from '../data.js'
import { generateId } from '../utils.js'

export const personsRouter = express.Router()

// GET all persons
personsRouter.get('/persons', (req, res) => {
  res.json(personsData)
})

// GET a single person by ID
personsRouter.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  const person = personsData.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

// GET info
personsRouter.get('/info', (req, res) => {
  const date = new Date()
  res.send(
    `<p>Phonebook has info for ${personsData.length} people</p><p>${date}</p>`
  )
})

// DELETE a person by ID
personsRouter.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  const newArray = personsData.filter((person) => person.id !== id)
  console.log(newArray)
  res.status(204).end()
})

// POST add a new person
personsRouter.post('/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name and number are required' })
  }
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  personsData.concat(newPerson)
  res
    .status(201)
    .json(newPerson)
})

// UPDATE existing person
personsRouter.put('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  const personIndex = personsData.findIndex((person) => person.id === id)

  if (personIndex === -1) {
    return res.status(404).json({error: 'person not found'})
  }

  const updatedPerson = { ...personsData[personIndex], ...body, id}
  personsData[personIndex] = updatedPerson

  res.json(updatedPerson)
})
