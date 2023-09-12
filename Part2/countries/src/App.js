import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesData = ({ countries, findCountries}) => {
  const countriesToShow = findCountries
    ? countries.filter(country => country.name.toLowerCase().includes(findCountries))
    : countries

    return (
    <ul>
      {countriesToShow.map((country, index) => (
        <li key={index}>
          {country.name} {'other info'}
        </li>
      ))}
    </ul>
    )
}

const FindCountries = ({ handleFindCountries }) => {
  return (
    <div>
      <p>
        find countries <input type='text'
        onChange={handleFindCountries} />
      </p>
    </div>
  )
}

const App = () => {
  const [countries, SetCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')

  useEffect(() => {
    console.log('fetching countries...')

    //skip if country not defined
    if (country) {
      console.log('fetching data for country...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/{country}`)
        .then(response => {
          SetCountries(response.data.rates)
        })
    }
  }, [country])

  const handleFindCountries = (event) => {
    setFindCountries(event.target.value.toLowerCase())
    console.log(findCountries)
  }

  return (
    <div>
      <FindCountries handleFindCountries={handleFindCountries} />
      <CountriesData />
    </div>
  )
}

export default App;
