import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ({ handleFindCountries }) => {
  return (
    <div>
    find countries <input type='text'
    onChange={handleFindCountries} />
    </div>
  )
}

// Display countries with name containing term 'search'
const Countries = ({ countries, search }) => {
  const countriesToShow = search
  ? countries.filter(country => country.toLowerCase().includes(search))
  : countries

  console.log(countriesToShow.length)

  if ((10 < countriesToShow.length) && (search.length != 0 )) {
    return (
      <p>
      Too many matches, specify another filter
      </p>
    )
  }
  else if ( ( countriesToShow.length > 1 ) && (countriesToShow.length < 11) ) {
    return (
      <ul>
        {countriesToShow.map((country, i) => 
          <li key={i}>
            {country}
          </li>
        )}
      </ul>
    )
  }
  else if (countriesToShow.length === 1) {
    console.log(`Display single country data ${countriesToShow.toString().toLowerCase()}` )
  }
}

const App = () => {
  const [countries, SetCountries] = useState([])
  const [countryData, setCountryData] = useState()
  const [countryToFetch, setCountryToFetch] = useState(null)
  const [search, setSearch] = useState('')

  // Get the list of country (common) names
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
            const fetchedCountries = response.data.map( country => country.name.common)
            SetCountries(fetchedCountries)
        })
        .catch( error => {
          console.log('error fetching countries')
        })
      }, []
  )

  // Get data for specific country
  useEffect(() => {
    if (countryToFetch) {
      console.log('fetching country data...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryToFetch}`)
        .then(response => {
            setCountryData = response.data
        })
        .catch( error => {
          console.log('error fetching country')
        })
    }
  }, []
  )

  const handleFindCountries = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h1>
        Countries
      </h1>
      <p>
        Now we will create the search component 'find countries', and display matches.
      </p>
      <h2>
        Search
      </h2>
      <FindCountries handleFindCountries={handleFindCountries} />
      <Countries countries={countries} search={search} />
    </div>
  )
}

export default App;
