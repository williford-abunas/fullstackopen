import express from 'express'
import Person from '../models/person.js'

export const personsRouter = express.Router()

// GET all persons
personsRouter.get('/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    next(error)
  }
})

// GET a single person by ID
personsRouter.get('/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

// GET info
personsRouter.get('/info', async (req, res, next) => {
  const date = new Date()
  try {
    const persons = await Person.find({})
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
  } catch (error) {
    next(error)
  }
})

// DELETE a person by ID
personsRouter.delete('/persons/:id', async (req, res, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)

    if (!deletedPerson)
      return res.status(404).json({ error: 'Person not found!' })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// POST add a new person
personsRouter.post('/persons', async (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name and number are required' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  try {
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

// UPDATE existing person
personsRouter.put('/persons/:id', async (req, res, next) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})
