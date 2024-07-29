import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookApi from './services/persons'
import timeOut from './helper'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await phonebookApi.getAllUsers()
        setPersons(response)
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.message,
        })
        timeOut(setMessage)
        console.error('Error fetching persons:', error)
      }
    }
    fetchPersons()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the name already exists
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to phonebook, replace old number with the new one?`
      )

      if (confirmUpdate) {
        try {
          const updatedUser = await phonebookApi.updateUser(
            existingPerson.id,
            newPerson
          )
          console.log(updatedUser)
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? updatedUser : p))
          )
          setNewPerson({ name: '', number: '' })
          setMessage({
            type: 'success',
            text: `Updated ${updatedUser.name} with ${updatedUser.number}`,
          })
          timeOut(setMessage)
        } catch (error) {
          console.error('Error updating user:', error)
          setMessage({
            type: 'error',
            text: `Person validation failed: ${error.message}`,
          })
          timeOut(setMessage)
        }
      }
      return
    }

    // Add new person
    try {
      const createdUser = await phonebookApi.createUser(newPerson)
      setPersons([...persons, createdUser])
      setNewPerson({ name: '', number: '' })
      setMessage({
        type: 'success',
        text: `Successfully added ${createdUser.name}`,
      })
      timeOut(setMessage)
    } catch (error) {
      console.error('Error creating user:', error)
      setMessage({
        type: 'error',
        text: `Person validation failed: ${error.message}`,
      })

      timeOut(setMessage)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPerson({
      ...newPerson,
      [name]: value,
    })
  }

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete User?')) {
      try {
        await phonebookApi.deleteUser(id)
        setPersons(persons.filter((person) => person.id !== id))
        setMessage({ type: 'success', text: `Successfully deleted user ${id}` })
        timeOut(setMessage)
      } catch (error) {
        console.error('Error deleting user:', error)
        setMessage({ type: 'error', text: `${error.message}` })
        timeOut(setMessage)
      }
    }
  }

  const filteredPersons = persons?.filter((person) =>
    person.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} filter={filter} />
      <h2>Add new entry</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Persons person={person} key={person.id} handleDelete={handleDelete} />
      ))}
    </div>
  )
}

export default App
