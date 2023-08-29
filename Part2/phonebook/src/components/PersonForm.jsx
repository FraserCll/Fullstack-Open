const PersonForm = ({ addName, persons, newName, newNumber, setNewName, setNewNumber, setPersons, handleNameChange, handleNumberChange }) => {
    return (
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
    )
  }

  export default PersonForm