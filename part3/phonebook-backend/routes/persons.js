import express, { response } from 'express'
import Person from '../models/person.js'

export const personsRouter = express.Router()

// GET all persons
personsRouter.get('/persons', async (req, res) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET a single person by ID
personsRouter.get('/persons/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// // GET info
// personsRouter.get('/info', (req, res) => {
//   const date = new Date()
//   res.send(
//     `<p>Phonebook has info for ${personsData.length} people</p><p>${date}</p>`
//   )
// })

// DELETE a person by ID
personsRouter.delete('/persons/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)

    if (!deletedPerson)
      return res.status(404).json({ error: 'Person not found' })

    res.status(204).end()
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// POST add a new person
personsRouter.post('/persons', async (req, res) => {
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
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// UPDATE existing person
personsRouter.put('/persons/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(updatedPerson)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})
