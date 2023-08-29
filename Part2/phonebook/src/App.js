import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if ( names.indexOf(newName) > -1 ) {
      console.log('error message')
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName, number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

  const personsToShow = filterName
    ? persons.filter(person => person.name.toLowerCase().includes(filterName))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <input type='text' value={filterName}
        onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type='text' value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input type='text' value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App