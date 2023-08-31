const Persons = ({ persons, filterName, handleDelete}) => {
    const personsToShow = filterName
    ? persons.filter(person => person.name.toLowerCase().includes(filterName))
    : persons

    return (
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete 
            </button>
          </li>
        ))}
      </ul>
    )
  }

  export default Persons