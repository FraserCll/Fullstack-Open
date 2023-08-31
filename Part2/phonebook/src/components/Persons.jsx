const Persons = ({ persons, filterName}) => {
    const personsToShow = filterName
    ? persons.filter(person => person.name.toLowerCase().includes(filterName))
    : persons
  
    return (
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    )
  }

  export default Persons