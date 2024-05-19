import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookApi from './apiClient/api'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await phonebookApi.getAllUsers()
        setPersons(response)
      } catch (error) {
        console.error('Error fetching persons:', error)
      }
    }
    fetchPersons()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if name exists do not add : if exists then add
    for (const person of persons) {
      if (newPerson.name === person.name) {
        const confirmUpdate = window.confirm(
          `${newPerson.name} is already added to phonebook, replace old number with the new one?`
        )

        if (confirmUpdate) {
          try {
            const updatedUser = await phonebookApi.updateUser(
              person.id,
              newPerson
            )
            setPersons(
              persons.map((p) =>
                p.id === person.id ? { ...updatedUser, id: person.id } : p
              )
            )
            setNewPerson({ name: '', number: '' })
            return
          } catch (error) {
            console.error('Error updating user:', error)
          }
        } else {
          setNewPerson({ name: '', number: '' })
          return
        }
      }
    }

    try {
      const createdUser = await phonebookApi.createUser(newPerson)
      if (createdUser) {
        setPersons([...persons, createdUser])
        setNewPerson({ name: '', number: '' })
      }
    } catch (error) {
      console.error('Error creating user:', error)
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
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const filteredPersons = persons?.filter((person) =>
    person.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
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
