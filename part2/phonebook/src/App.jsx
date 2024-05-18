import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if name exists do not add : if exists then add
    for (const person of persons) {
      if (newPerson.name === person.name) {
        alert(`${newPerson} is already added!`)
        setNewPerson({ name: '', number: '' })
        return
      }
    }

    setPersons([...persons, { ...newPerson, id: persons.length + 1 }])
    setNewPerson({ name: '', number: '' })
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
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
        <Persons person={person} key={person.id} />
      ))}
    </div>
  )
}

export default App
