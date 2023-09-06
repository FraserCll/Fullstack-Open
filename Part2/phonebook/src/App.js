import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event, id) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    let existingPerson = null

    if ( names.indexOf(newName) > -1 ) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      existingPerson = persons.find(person => person.name === newName)
      const updatedPerson = { ...existingPerson, number: newNumber}

      personService
        .replaceNumber(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => (person.id === returnedPerson.id ? returnedPerson : person)))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Number for '${newName}' replaced.`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          alert(
            `An error occurred while updating the number for ${newName}`
          )
        })
    }
    else {
        const personObject = {
        name: newName, number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`))
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(
          `${name} deleted.`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(
          `the person '${name}' was already deleted from server `
        )
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm addName={addName} persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
    </div>
  )
}

export default App