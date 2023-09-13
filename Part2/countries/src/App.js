import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, SetCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')
  const fetchedCountries = []

  useEffect(() => {
    console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
            const fetchedCountries = response.data.map( country => country.name.common)
            SetCountries(fetchedCountries)
        })
        .catch( error => {
          console.log('error fetching countries')
        })
      }, [])

  return (
    <div>
      <h1>
        Countries
      </h1>
      <p>
        First we will work on a solution which fetches all the common names of the countries and diplays them in a nice list below.
      </p>
      <h2>
        List of all countries
      </h2>
      <ul>
        {countries.map((country, i) =>
          <li key={i}>
            {country}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;
